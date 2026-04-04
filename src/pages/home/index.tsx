import { useEffect, useState } from "react";
import { fetchNetworkElements, deleteNetworkElements } from "./api/api";
import { type NetworkElement } from "../../entities/Element";
import { elementsTableColumns } from "../../features/elementsTable/elementsColumns";
import Table from "../../widgets/Table/Table";
import classes from "./home.module.css";
import { type AllStatuses } from "../../shared/constants/allStatuses";
import { Status } from "../../shared/UI/components/Status/Status";

export function HomePage() {
  const [elements, setElements] = useState<NetworkElement[]>([]);

  useEffect(() => {
    fetchNetworkElements().then((data) => setElements(data));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this element?"))
      return;
    try {
      await deleteNetworkElements(id);
      setElements((prev) => prev.filter((el) => el.id !== id));
    } catch (error) {
      console.error("Delete failed: ", error);
      alert("Failed to delete element");
    }
  };

  return (
    <div>
      <Table
        columnsTable={elementsTableColumns}
        dataTable={elements}
        renderDetails={(row) => (
          <div className={classes.info}>
            <div className={classes.info_header}>
              <h3>
                <span>ID:</span> {row.id}
              </h3>
              <button
                onClick={() => handleDelete(row.id)}
                className={classes.deleteBtn}
              >
                Delete Element
              </button>
            </div>

            <div className={classes.info_grid}>
              <div className={classes.detail_item}>
                <span>Device name:</span>
                <p>{row.name}</p>
              </div>
              <div className={classes.detail_item}>
                <span>IP Address:</span>
                <p>{row.address}</p>
              </div>
              <div className={classes.detail_item}>
                <span>Vendor:</span>
                <p>{row.vendor}</p>
              </div>
              <div className={classes.detail_item}>
                <span>Status:</span>
                <Status status={row.status as AllStatuses} />
              </div>
              <div className={classes.detail_item}>
                <span>Created:</span>
                <p>{new Date(row.created_at).toLocaleString()}</p>
              </div>
              <div className={classes.detail_item}>
                <span>Updated:</span>
                <p>{new Date(row.updated_at).toLocaleString()}</p>
              </div>
            </div>

            <div className={classes.capabilities_section}>
              <span>Capabilities:</span>
              <div className={classes.tags_list}>
                {row.capabilities.map((cap, index) => (
                  <span key={index} className={classes.tag}>
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      ></Table>
    </div>
  );
}
