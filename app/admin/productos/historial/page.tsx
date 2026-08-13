import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import { DiffProductItem, getAuditLogDiff, getColorForAudit, getIconForAudit, getLabelForAudit } from "@/utils";
import Link from "next/link";

function formatDateToDMY(dateInput: string | Date | undefined) {
  if (!dateInput) return "";
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (Number.isNaN(d.getTime())) return String(dateInput);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}

function getFieldLabel(field: string) {
  const map: Record<string, string> = {
    name: 'Nombre',
    price: 'Precio',
    stock: 'Stock',
    description: 'Descripción',
    category_id: 'Categoría',
    sku: 'SKU',
    status: 'Estado',
    weight: 'Peso',
    dimensions: 'Dimensiones',
    // agrega aquí otros mapeos que necesites
  };
  return map[field] ?? field.replaceAll('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValueForDisplay(value: unknown) {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') {
    try {
      const str = JSON.stringify(value as Record<string, unknown>);
      return str.length > 120 ? str.slice(0, 117) + '...' : str;
    } catch (e) {
      return String(value);
    }
  }
  return String(value);
}

export default async function ProductHistory() {
  const supabase = await createClient();

  const { data: h, error } = await supabase
    .from('product_audit_log')
    .select('*')
    .order('changed_at', { ascending: false });

  const history = (h ?? []).map(item => ({
    ...item,
    old_data: item.old_data as unknown as Product,
    new_data: item.new_data as unknown as Product,
  }));

  if (error) {
    console.error('Error al cargar el historial de cambios:', error);
    return <div>Error al cargar el historial de cambios</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Historial de cambios</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6 p-4">
        {history.map((historyRecord) => (
          <div key={historyRecord.id} className="flex items-center p-4 my-4 justify-between shadow rounded-lg">
            <Badge variant="outline" className={getColorForAudit(historyRecord.action)}>
              {getIconForAudit(historyRecord.action)}
              {getLabelForAudit(historyRecord.action)}
            </Badge>
            <Separator orientation="vertical" className="mr-2 h-4 w-4" />

            {historyRecord.action === "CREATE" && (
              <div className="flex items-center gap-2">
                <span className="text-sm bg-green-200 ">{historyRecord.new_data?.name}</span>
              </div>
            )}

            {historyRecord.action === "UPDATE" && (
              <div className="flex flex-col text-left flex-1 mx-4">
                <Link className="text-sm hover:underline text-white bg-black rounded-lg px-2 py-1 inline-block" href={`/admin/productos/${historyRecord.old_data.id}`}>
                  {historyRecord.old_data?.name}
                </Link>

                <div className="mt-2 grid gap-2">
                  {getAuditLogDiff(historyRecord.old_data, historyRecord.new_data).map((diffItem: DiffProductItem) => (
                    <div className="flex items-center gap-3" key={diffItem.field}>
                      <div style={{ minWidth: 160 }}>
                        <strong>{getFieldLabel(diffItem.field)}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm bg-red-200 px-2 py-1 rounded">{formatValueForDisplay(diffItem.oldValue)}</span>
                        <span aria-hidden>➡️</span>
                        <span className="text-sm bg-green-200 px-2 py-1 rounded">{formatValueForDisplay(diffItem.newValue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {historyRecord.action === "DELETE" && (
              <div className="flex items-center gap-2">
                <span className="text-sm bg-red-200 ">{historyRecord.old_data?.name}</span>
              </div>
            )}
            <Separator orientation="vertical" className="mr-2 h-4 w-4" />
            <p className="text-sm">{formatDateToDMY(historyRecord.changed_at)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
