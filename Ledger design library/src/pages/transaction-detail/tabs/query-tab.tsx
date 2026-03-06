import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileText, CheckCircle2, Tag, Pencil, Eye, Plus, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ─── Style constants ───────────────────────────────────────────────────────────

const clr = {
  black900:   "#0F172A",
  black700:   "#334155",
  black500:   "#64748B",
  black300:   "#CBD5E1",
  white:      "#FFFFFF",
  // design system tokens (no amber theme)
  primary200: "var(--secondary)",        // table header / section bg
  primary300: "var(--border)",           // table border / dividers
  primary400: "var(--input)",            // dashed dividers
  primary700: "var(--foreground)",       // icon color / marker badge
  yellow900:  "var(--muted-foreground)", // tag icon
};

const tx: Record<string, React.CSSProperties> = {
  h2:    { fontSize: "28px", fontWeight: 700,  lineHeight: "1.2" },
  bodyL: { fontSize: "15px", fontWeight: 400,  lineHeight: "1.5" },
  bodyM: { fontSize: "14px", fontWeight: 400,  lineHeight: "1.5" },
  bodyS: { fontSize: "12px", fontWeight: 400,  lineHeight: "1.5" },
  dataXS:{ fontSize: "10px", fontWeight: 400,  lineHeight: "1.4" },
};

const shadow = {
  sm: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.06)",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type Contract = {
  name: string;
  status: "Processed" | "Pending";
  classifications: string[];
  signedDate: string;
};

const CONTRACTS: Contract[] = [
  { name: "Lofty PA 2023 LCM Agreement",    status: "Processed", classifications: ["Securities Broker Engagement", "Original"], signedDate: "3/27/2023" },
  { name: "Lofty PA 2023 LCM Agreement",    status: "Processed", classifications: ["Reinsurance Trust", "Original"],           signedDate: "3/27/2023" },
  { name: "Alpine RE 2024 Master Agreement", status: "Processed", classifications: ["Quota Share", "Amendment"],               signedDate: "1/15/2024" },
  { name: "Summit Insurance Excess of Loss", status: "Pending",   classifications: ["Excess of Loss", "Original"],             signedDate: "2/28/2024" },
  { name: "Coastal Reinsurance Treaty 2023", status: "Processed", classifications: ["Treaty Reinsurance", "Renewal"],          signedDate: "12/1/2023" },
];

const CORE_DEAL_TERMS = [
  { label: "Ceding Insurer",     value: "Neptune National Insurance" },
  { label: "Product Line",       value: "Private Passenger Auto"     },
  { label: "Reinsurance Type",   value: "Treaty"                     },
  { label: "Quota Share Percent",value: "100%"                       },
];

const RISK_STRUCTURE_TERMS = [
  { label: "Aggregate Limit Basis",   value: "Percentage of Net Premium"                 },
  { label: "Aggregate Limit",         value: "115%"                                       },
  { label: "Coverage Layers Basis",   value: "percent_of_net_premium"                    },
  { label: "Coverage Layer Amounts",  value: "Attachment: 0%, Exhaustion: 115%"          },
  { label: "Loss Corridor",           value: "N/A"                                        },
  { label: "Occurrence Limit Basis",  value: "Amount"                                    },
  { label: "Occurrence Limit",        value: "$1,000,000"                                 },
  { label: "Policy Max Limits",       value: "Automobile liability: 0, Individual: $30,000" },
  { label: "Quota Share Percent",     value: "90%"                                        },
];

// Positions for numbered markers overlaid on the PDF pages
const MARKERS = [
  { num: 1,  top: 85,   left: 25,  boxWidth: 180, boxHeight: 20 },
  { num: 2,  top: 180,  left: 320, boxWidth: 120, boxHeight: 18 },
  { num: 3,  top: 350,  left: 45,  boxWidth: 200, boxHeight: 22 },
  { num: 4,  top: 520,  left: 280, boxWidth: 90,  boxHeight: 16 },
  { num: 5,  top: 920,  left: 35,  boxWidth: 280, boxHeight: 60 },
  { num: 6,  top: 1050, left: 300, boxWidth: 100, boxHeight: 18 },
  { num: 7,  top: 1250, left: 60,  boxWidth: 150, boxHeight: 20 },
  { num: 8,  top: 1450, left: 250, boxWidth: 130, boxHeight: 18 },
  { num: 9,  top: 1720, left: 40,  boxWidth: 160, boxHeight: 20 },
  { num: 10, top: 1900, left: 290, boxWidth: 110, boxHeight: 18 },
  { num: 11, top: 2100, left: 55,  boxWidth: 190, boxHeight: 22 },
  { num: 12, top: 2280, left: 310, boxWidth: 85,  boxHeight: 16 },
  { num: 13, top: 2550, left: 30,  boxWidth: 170, boxHeight: 20 },
  { num: 14, top: 2750, left: 270, boxWidth: 140, boxHeight: 18 },
  { num: 15, top: 2950, left: 50,  boxWidth: 210, boxHeight: 24 },
  { num: 16, top: 3350, left: 35,  boxWidth: 155, boxHeight: 20 },
  { num: 17, top: 3550, left: 295, boxWidth: 95,  boxHeight: 16 },
  { num: 18, top: 3750, left: 45,  boxWidth: 185, boxHeight: 22 },
];

// ─── Upload card ───────────────────────────────────────────────────────────────

function UploadCard({ onStartExtracting }: { onStartExtracting: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ file: File; status: "processing" | "done" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") return;
    setUploadedFile({ file, status: "processing" });
    setTimeout(
      () => setUploadedFile((prev) => (prev ? { ...prev, status: "done" } : null)),
      2000
    );
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden shadow-sm mb-5">
      {/* Card header */}
      <div className="px-5 py-3.5 border-b border-border bg-secondary text-sm font-semibold text-foreground">
        Upload Contract
      </div>

      {/* Drop zone */}
      <div
        className={cn(
          "m-4 rounded-xl h-[160px] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all bg-secondary",
          isDragging && "ring-2 ring-foreground/30 scale-[1.01]"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFileSelect(f);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Document icon */}
        <div className="relative">
          <div className="w-[54px] h-[71px] bg-background rounded-lg shadow-md flex flex-col items-start justify-start p-2 pt-3 gap-2">
            <div className="h-0.5 bg-border/70 w-5" />
            <div className="h-0.5 bg-border/70 w-7" />
            <div className="h-0.5 bg-border/70 w-7" />
            <div className="h-0.5 bg-border/70 w-7" />
            <div className="h-0.5 bg-border/70 w-4" />
          </div>
          <div className="absolute -bottom-2 -right-2 size-6 bg-red-600 rounded flex items-center justify-center text-[9px] font-bold text-white leading-none">
            PDF
          </div>
        </div>

        <p className="text-sm text-foreground">
          Drop file here to get started or{" "}
          <span className="underline">browse</span>
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFileSelect(f);
            e.target.value = "";
          }}
        />
      </div>

      {/* Uploaded file row */}
      {uploadedFile && (
        <div className="px-5 pb-4">
          <div className="h-px bg-border mb-3" />
          <div className="flex items-center gap-3">
            <div className="size-6 bg-red-600 rounded flex items-center justify-center text-[8px] font-bold text-white shrink-0">
              PDF
            </div>
            <span className="text-sm text-foreground flex-1 truncate min-w-0">
              {uploadedFile.file.name}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">
              {uploadedFile.status === "processing" ? "Processing…" : "Ready"}
            </span>
            <Button
              type="button"
              size="sm"
              disabled={uploadedFile.status === "processing"}
              onClick={onStartExtracting}
            >
              Start Extracting
            </Button>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              onClick={() => setUploadedFile(null)}
            >
              <X size={12} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Contracts list view ──────────────────────────────────────────────────────

function ContractsList({
  onOpen,
  onStartExtracting,
}: {
  onOpen: (contract: Contract) => void;
  onStartExtracting: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = CONTRACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.classifications.some((cl) => cl.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      {/* Upload card */}
      <UploadCard onStartExtracting={onStartExtracting} />

      {/* Action bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search
            size={14}
            color={clr.black500}
            style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }}
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contracts…"
            className="pl-8 w-60"
          />
          {search && (
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              onClick={() => setSearch("")}
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <X size={12} />
            </Button>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <Button type="button" variant="outline" size="sm">
            Run Extraction
          </Button>
          <Button type="button" size="sm">
            <Plus size={14} />
            Add Contract
          </Button>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: clr.white,
          borderRadius: "12px",
          border: `1px solid ${clr.black300}`,
          overflow: "hidden",
          boxShadow: shadow.sm,
        }}
      >
        {/* Table title */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: `1px solid ${clr.primary300}`,
            backgroundColor: clr.primary200,
            ...tx["bodyM"],
            fontWeight: 600,
            color: clr.black900,
          }}
        >
          Contracts
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary">
              <TableHead className="whitespace-nowrap">
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <FileText size={12} color={clr.primary700} />
                  Name
                </div>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={12} color={clr.primary700} />
                  Status
                </div>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Tag size={12} color={clr.primary700} />
                  Classifications
                </div>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Tag size={12} color={clr.primary700} />
                  Signed Date
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((contract, i) => (
              <ContractRow key={i} contract={contract} onClick={() => onOpen(contract)} />
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  No contracts match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ContractRow({ contract, onClick }: { contract: Contract; onClick: () => void }) {
  return (
    <TableRow onClick={onClick} className="cursor-pointer">
      {/* Name */}
      <TableCell>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FileText size={14} color={clr.primary700} />
          <span style={{ ...tx["bodyM"], color: clr.black900 }}>{contract.name}</span>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <StatusBadge status={contract.status} />
      </TableCell>

      {/* Classifications */}
      <TableCell>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {contract.classifications.map((cl, i) => (
            <Badge key={i} variant="secondary">
              {cl}
            </Badge>
          ))}
        </div>
      </TableCell>

      {/* Signed Date */}
      <TableCell style={{ ...tx["bodyM"], color: clr.black700 }}>
        {contract.signedDate}
      </TableCell>
    </TableRow>
  );
}

function StatusBadge({ status }: { status: "Processed" | "Pending" }) {
  const isProcessed = status === "Processed";
  return (
    <Badge
      variant="secondary"
      className={
        isProcessed
          ? "bg-green-100 text-green-800 border-transparent"
          : "bg-yellow-100 text-yellow-800 border-transparent"
      }
    >
      {status}
    </Badge>
  );
}

// ─── AI Extraction / detail view ──────────────────────────────────────────────

function AIExtraction({ contract }: { contract: Contract }) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToMarker = (markerNum: number) => {
    setSelectedItem(markerNum);
    const el = document.getElementById(`marker-${markerNum}`);
    if (el && scrollRef.current) {
      const markerTop = el.offsetTop;
      scrollRef.current.scrollTo({ top: markerTop - 50, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: "32px" }}>
        <span style={{ ...tx["h2"], color: clr.black900 }}>Extracted terms </span>
        <span style={{ ...tx["h2"], color: clr.black500, fontStyle: "italic" }}>from </span>
        <span style={{ ...tx["h2"], color: clr.black900 }}>{contract.name}</span>
      </div>

      {/* Main card container */}
      <div
        style={{
          backgroundColor: clr.primary200,
          borderRadius: "16px",
          padding: "12px",
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        {/* ── Left: PDF viewer (60%) ── */}
        <div style={{ flex: "0 0 60%", display: "flex", flexDirection: "column" }}>
          {/* File name bar */}
          <div
            style={{
              backgroundColor: clr.white,
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: `1px solid ${clr.primary300}`,
            }}
          >
            <FileText size={16} color={clr.black900} />
            <span style={{ ...tx["bodyL"], color: clr.black500, fontWeight: 500 }}>
              XYZ Quota Share Reinsurance Agreement 2024.pdf
            </span>
          </div>

          {/* Scrollable PDF pages — plain div required for programmatic scrollTo */}
          <div
            ref={scrollRef}
            style={{
              backgroundColor: clr.white,
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              overflow: "hidden auto",
              maxHeight: "880px",
              position: "relative",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* Numbered markers overlaid on the document */}
              {MARKERS.map(({ num, top, left, boxWidth, boxHeight }) => (
                <div
                  key={num}
                  id={`marker-${num}`}
                  style={{
                    position: "absolute",
                    top: `${top}px`,
                    left: `${left}px`,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "4px",
                    zIndex: 10,
                  }}
                >
                  {/* Badge */}
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: clr.primary700,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ...tx["bodyS"],
                      color: clr.white,
                      flexShrink: 0,
                      fontSize: "9px",
                      fontWeight: 700,
                    }}
                  >
                    {num}
                  </div>
                  {/* Highlight box — only when selected */}
                  {selectedItem === num && (
                    <div
                      style={{
                        width: `${boxWidth}px`,
                        height: `${boxHeight}px`,
                        backgroundColor: "rgba(252, 220, 106, 0.2)",
                        border: "1.6px solid #D9B740",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Contract page images */}
              {[1, 2, 3, 4, 5].map((pageNum, idx) => (
                <React.Fragment key={pageNum}>
                  <img
                    src={`/contract/${pageNum}.png`}
                    alt={`Contract page ${pageNum}`}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  {idx < 4 && (
                    <div
                      style={{
                        height: "2px",
                        backgroundColor: clr.primary400,
                        margin: "0 20px",
                        width: "calc(100% - 40px)",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Extracted terms (40%) ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            backgroundColor: clr.white,
            borderRadius: "8px",
            padding: "16px",
            maxHeight: "904px",
            overflowY: "auto",
          }}
        >
          {/* Section: Core Deal Identity */}
          <TermsSection title="Core Deal Identity" hideTopBorder>
            <TermsCard
              terms={CORE_DEAL_TERMS}
              startIndex={1}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              onLook={scrollToMarker}
            />
            <SubjectBusinessCard
              index={5}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              onLook={scrollToMarker}
            />
            <CoverageTypeCard
              index={6}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              onLook={scrollToMarker}
            />
          </TermsSection>

          {/* Section: Risk Structure & Limits */}
          <TermsSection title="Risk Structure & Limits">
            <TermsCard
              terms={RISK_STRUCTURE_TERMS}
              startIndex={10}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              onLook={scrollToMarker}
            />
          </TermsSection>
        </div>
      </div>
    </div>
  );
}

// ─── Terms section wrapper ─────────────────────────────────────────────────────

function TermsSection({
  title,
  children,
  hideTopBorder,
}: {
  title: string;
  children: React.ReactNode;
  hideTopBorder?: boolean;
}) {
  return (
    <div>
      {!hideTopBorder && <div style={{ height: "1px", backgroundColor: clr.primary400, width: "100%" }} />}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 0" }}>
        <Tag size={14} color={clr.yellow900} />
        <span style={{ ...tx["bodyL"], color: clr.black900, fontWeight: 500 }}>{title}</span>
      </div>
      <div style={{ height: "1px", backgroundColor: clr.primary400, width: "100%", marginBottom: "12px" }} />
      {children}
    </div>
  );
}

// ─── Standard term rows (label + value) ───────────────────────────────────────

function TermsCard({
  terms,
  startIndex,
  hoveredItem,
  setHoveredItem,
  onLook,
}: {
  terms: { label: string; value: string }[];
  startIndex: number;
  hoveredItem: number | null;
  setHoveredItem: (n: number | null) => void;
  onLook: (n: number) => void;
}) {
  return (
    <div>
      {terms.map((term, i) => {
        const itemIdx = startIndex + i;
        const isHovered = hoveredItem === itemIdx;
        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredItem(itemIdx)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingBottom: "8px",
              marginBottom: "8px",
              borderBottom: `1px dashed ${clr.primary400}`,
              position: "relative",
            }}
          >
            <span style={{ ...tx["bodyM"], color: clr.black700, flex: "0 0 auto" }}>
              {itemIdx}. {term.label}
            </span>
            <span style={{ ...tx["bodyL"], color: clr.black900, textAlign: "right", flex: 1, marginLeft: "16px" }}>
              {term.value}
            </span>
            {isHovered && (
              <HoverIcons onEdit={() => undefined} onLook={() => onLook(itemIdx)} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Subject Business (long text) row ─────────────────────────────────────────

function SubjectBusinessCard({
  index,
  hoveredItem,
  setHoveredItem,
  onLook,
}: {
  index: number;
  hoveredItem: number | null;
  setHoveredItem: (n: number | null) => void;
  onLook: (n: number) => void;
}) {
  const isHovered = hoveredItem === index;
  return (
    <div
      onMouseEnter={() => setHoveredItem(index)}
      onMouseLeave={() => setHoveredItem(null)}
      style={{
        paddingBottom: "8px",
        marginBottom: "8px",
        borderBottom: `1px dashed ${clr.primary400}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ ...tx["bodyM"], color: clr.black700 }}>{index}. Subject Business</span>
        {isHovered && <HoverIcons onEdit={() => undefined} onLook={() => onLook(index)} />}
      </div>
      <p style={{ ...tx["bodyL"], color: clr.black900, lineHeight: 1.5, margin: 0 }}>
        Liability that may accrue to the Company as a result of loss or losses under Policies produced and
        underwritten by ACME Insurance Company, classified by the Company as Automobile Liability, including
        Bodily Injury, Property Damage Liability, Uninsured Motorists, Underinsured Motorists, Medical
        Payments and Personal Injury Protection, and Automobile Physical Damage business written or renewed
        during the term of this Agreement, subject to the terms and conditions herein contained.
      </p>
    </div>
  );
}

// ─── Coverage Type row ────────────────────────────────────────────────────────

function CoverageTypeCard({
  index,
  hoveredItem,
  setHoveredItem,
  onLook,
}: {
  index: number;
  hoveredItem: number | null;
  setHoveredItem: (n: number | null) => void;
  onLook: (n: number) => void;
}) {
  const isHovered = hoveredItem === index;
  return (
    <div
      onMouseEnter={() => setHoveredItem(index)}
      onMouseLeave={() => setHoveredItem(null)}
      style={{ paddingBottom: "8px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ ...tx["bodyM"], color: clr.black700 }}>{index}. Coverage Type</span>
        <span style={{ ...tx["bodyL"], color: clr.black900 }}>Risk Attaching</span>
        {isHovered && <HoverIcons onEdit={() => undefined} onLook={() => onLook(index)} />}
      </div>
    </div>
  );
}

// ─── Hover action icons ────────────────────────────────────────────────────────

function HoverIcons({ onEdit, onLook }: { onEdit: () => void; onLook: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "8px" }}>
      <Button type="button" size="icon-sm" variant="ghost" onClick={onEdit}>
        <Pencil size={12} />
      </Button>
      <Button type="button" size="icon-sm" variant="ghost" onClick={onLook}>
        <Eye size={12} />
      </Button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function QueryTab({ transactionId: _transactionId }: { transactionId: string }) {
  const [open, setOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const handleOpen = (contract: Contract) => {
    setSelectedContract(contract);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleStartExtracting = () => {
    setSelectedContract(CONTRACTS[0]!);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div>
      <ContractsList onOpen={handleOpen} onStartExtracting={handleStartExtracting} />

      {open && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-6"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="relative w-full max-w-[1200px] bg-background rounded-2xl shadow-2xl p-8">
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="absolute top-4 right-4"
              onClick={handleClose}
            >
              <X size={16} />
            </Button>
            <AIExtraction contract={selectedContract ?? CONTRACTS[0]!} />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
