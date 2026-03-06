import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTabsStore } from "@/stores/tabs-store";
import { useNavigate } from "react-router-dom";
import { TableColumnHeader } from "./table-column-header";
import {
  TableToolbar,
  TableToolbarPagination,
  TableToolbarSearch,
  TableToolbarTitle,
} from "./table-toolbar";
import { useTransactions } from "../hooks/use-transactions";

function getStatusVariant(status: string) {
  if (status === "active") return "default" as const;
  if (status === "draft") return "secondary" as const;
  return "outline" as const;
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className="font-normal capitalize" variant={getStatusVariant(status)}>
      {status}
    </Badge>
  );
}

export function TransactionsTable() {
  const { data: transactions } = useTransactions();
  const openTab = useTabsStore((s) => s.openTab);
  const navigate = useNavigate();

  const handleRowClick = (tx: { id: string; name: string }) => {
    openTab({ id: tx.id, name: tx.name });
    navigate(`/transactions/${tx.id}`);
  };

  return (
    <div>
      <TableToolbar>
        <TableToolbarTitle>All Transactions</TableToolbarTitle>
        <TableToolbarSearch
          // biome-ignore lint/suspicious/noEmptyBlockStatements: static mock - no-op handler
          onChange={() => {}}
          placeholder="Search transactions..."
          value=""
        />
        <TableToolbarPagination
          currentPage={1}
          hasNextPage={false}
          hasPreviousPage={false}
          label="transactions"
          pageSize={20}
          totalCount={transactions.length}
        />
      </TableToolbar>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <TableColumnHeader disabled title="Transaction" />
            </TableHead>
            <TableHead>
              <TableColumnHeader disabled title="Cedent" />
            </TableHead>
            <TableHead>
              <TableColumnHeader disabled title="Reinsurer" />
            </TableHead>
            <TableHead>
              <TableColumnHeader disabled title="Policy Group" />
            </TableHead>
            <TableHead>
              <TableColumnHeader disabled title="Status" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              className="cursor-pointer"
              key={tx.id}
              onClick={() => handleRowClick(tx)}
            >
              <TableCell className="font-medium">{tx.name}</TableCell>
              <TableCell>{tx.cedent}</TableCell>
              <TableCell>{tx.reinsurer}</TableCell>
              <TableCell>{tx.policyGroup}</TableCell>
              <TableCell>
                <StatusBadge status={tx.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
