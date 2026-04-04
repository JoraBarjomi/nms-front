import classes from "./add.module.css";
import { ButtonAction } from "../../shared/UI/components/ButtonAction/ButtonAction";
import { InputForm } from "../../shared/UI/components/InputForm/InputForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNetworkElement } from "./api/api";
import { ButtonActionOutlined } from "../../shared/UI/components/ButtonActionOutlined/ButtonActionOutlined";

export function AddPage() {
  const navigate = useNavigate();
  const [elementData, setElementData] = useState({
    name: "",
    ipAddress: "",
    vendor: "",
    capabilities: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setElementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      await createNetworkElement(elementData);
      alert("Element created");
      navigate("/");
    } catch (error) {
      console.error("Error creating element ", error);
    }
  };

  return (
    <div className={classes.wrapperForm}>
      <div className={classes.formContainer}>
        <h2 className={classes.formTitle}>Add Network Element</h2>
        <div className={classes.form}>
          <InputForm
            labelText="Name"
            name="name"
            placeholder="enb-1"
            value={elementData.name}
            onChange={handleChange}
          />
          <InputForm
            labelText="Ip address"
            name="ipAddress"
            placeholder="10.0.0.1"
            value={elementData.ipAddress}
            onChange={handleChange}
          />
          <InputForm
            labelText="Vendor"
            name="vendor"
            placeholder="vendor-a"
            value={elementData.vendor}
            onChange={handleChange}
          />
          <InputForm
            labelText="Capabilites"
            name="capabilities"
            placeholder="capabilites"
            value={elementData.capabilities}
            onChange={handleChange}
          />
          <div className={classes.btns}>
            <ButtonActionOutlined
              onClick={() =>
                setElementData({
                  name: "",
                  ipAddress: "",
                  vendor: "",
                  capabilities: "",
                })
              }
            >
              Cancel
            </ButtonActionOutlined>
            <ButtonAction onClick={handleCreate}>Create</ButtonAction>
          </div>
        </div>
      </div>
    </div>
  );
}
