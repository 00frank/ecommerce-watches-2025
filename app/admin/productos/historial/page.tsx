import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import { DiffProductItem, getAuditLogDiff, getColorForAudit, getIconForAudit, getLabelForAudit } from "@/utils";
import Link from "next/link";

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
                <span className="text-sm bg-green-200 ">{historyRecord.new_data.name}</span>
              </div>
            )}

            {historyRecord.action === "UPDATE" && (
              <div className="flex flex-col text-center">
                <Link className="text-sm hover:underline text-white bg-black rounded-lg" href={`/admin/productos/${historyRecord.old_data.id}`}>
                  {historyRecord.old_data.name}
                </Link>
                {getAuditLogDiff(historyRecord.old_data, historyRecord.new_data).map((diffItem: DiffProductItem) => (
                  <div className="flex items-center gap-2" key={diffItem.field}>
                    <span className="text-sm bg-red-200 ">{diffItem.oldValue}</span> ➡️
                    <span className="text-sm bg-green-200">{diffItem.newValue}</span>
                  </div>
                ))}
              </div>
            )}

            {historyRecord.action === "DELETE" && (
              <div className="flex items-center gap-2">
                <span className="text-sm bg-red-200 ">{historyRecord.old_data.name}</span>
              </div>
            )}
            <Separator orientation="vertical" className="mr-2 h-4 w-4" />
            <p className="text-sm">{new Date(historyRecord.changed_at ?? '').toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}