import React, { useState } from "react";
import { ModalWrapper } from "../styles/Styles";
import Button from "../../ui/atomic/Button";
import { ControlledField, useRHForm } from "../../form";
import { z } from "zod";
import { Input, Select } from "antd";

const AddMayor: React.FC = () => {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "Congress", label: "Congress" },
    { value: "Amale", label: "Amale" },
    { value: "Communist", label: "Communist" },
    { value: "Independent", label: "Independent" },
    { value: "RA-SWA-PA", label: "RA-SWA-PA" },
  ];
  const {
    Form,
    methods: {
      control,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: {},
    schema: z.object({
      name: z.string({ required_error: "Name is required." }),
      party: z.string({ required_error: "Party is required." }),
    }),
  });

  const handleSubmit = (data: any) => {
    console.log(data, "data");
    try {
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="primary" onClick={showModal}>
        Add Mayor
      </Button>
      <ModalWrapper title="Add Mayor" open={open} onCancel={handleCancel}>
        <Form onSubmit={handleSubmit}>
          <ControlledField
            className="mb-5"
            control={control}
            name="name"
            label="Name"
            Component={Input}
            componentProps={{
              size: "large",
              placeholder: "name",
            }}
            errors={errors}
          />
          <div className="flex gap-8 mb-5">
            <ControlledField
              control={control}
              name="party"
              label="Party"
              Component={Select}
              componentProps={{
                size: "large",
                placeholder: "Select Party Name",
                options: options,
              }}
              errors={errors}
            />
          </div>

          <div className="flex gap-8">
            <Button variant="danger" className="w-[109px]">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="w-[109px]">
              Add
            </Button>
          </div>
        </Form>
      </ModalWrapper>
    </>
  );
};

export default AddMayor;
