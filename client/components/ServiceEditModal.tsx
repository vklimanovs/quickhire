import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import LanguageText from "./LanguageText";
import FormField from "./FormField";
import Button from "./Button";
import Modal from "./Modal";

interface Service {
  id?: string;
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
}

interface ServiceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
  service?: Service | null;
  mode: "add" | "edit";
}

export default function ServiceEditModal({
  isOpen,
  onClose,
  onSave,
  service,
  mode,
}: ServiceEditModalProps) {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState<Service>({
    title: "",
    description: "",
    price: "",
    deliveryTime: "",
  });

  useEffect(() => {
    if (service && mode === "edit") {
      setFormData(service);
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        deliveryTime: "",
      });
    }
  }, [service, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price.trim() ||
      !formData.deliveryTime.trim()
    ) {
      return;
    }

    onSave({
      ...formData,
      id: service?.id || Date.now().toString(),
    });
    onClose();
  };

  const handleChange = (field: keyof Service, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={{
        ru: mode === "add" ? "Добавить услугу" : "Редактировать услугу",
        en: mode === "add" ? "Add Service" : "Edit Service",
        et: mode === "add" ? "Lisa teenus" : "Muuda teenust",
      }}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <FormField
          label={{
            ru: "Название услуги",
            en: "Service Title",
            et: "Teenuse nimetus",
          }}
          type="text"
          value={formData.title}
          onChange={(value) => handleChange("title", value)}
          placeholder={{
            ru: "Введите название услуги",
            en: "Enter service title",
            et: "Sisestage teenuse nimetus",
          }}
          required={true}
        />

        <FormField
          label={{
            ru: "Описание",
            en: "Description",
            et: "Kirjeldus",
          }}
          type="textarea"
          value={formData.description}
          onChange={(value) => handleChange("description", value)}
          placeholder={{
            ru: "Опишите вашу услугу...",
            en: "Describe your service...",
            et: "Kirjeldage oma teenust...",
          }}
          required={true}
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={{
              ru: "Цена",
              en: "Price",
              et: "Hind",
            }}
            type="text"
            value={formData.price}
            onChange={(value) => handleChange("price", value)}
            placeholder={{
              ru: "€50/час или фиксированная цена",
              en: "€50/hour or fixed price",
              et: "€50/tund või fikseeritud hind",
            }}
            required={true}
          />

          <FormField
            label={{
              ru: "Срок выполнения",
              en: "Delivery Time",
              et: "Täitmisaeg",
            }}
            type="text"
            value={formData.deliveryTime}
            onChange={(value) => handleChange("deliveryTime", value)}
            placeholder={{
              ru: "2 недели, 1 месяц и т.д.",
              en: "2 weeks, 1 month, etc.",
              et: "2 nädalat, 1 kuu jne.",
            }}
            required={true}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            text={{
              ru: "Отмена",
              en: "Cancel",
              et: "Tühista",
            }}
          />
          <Button
            variant="primary"
            type="submit"
            icon={<Save className="h-4 w-4" />}
            text={{
              ru: "Сохранить",
              en: "Save",
              et: "Salvesta",
            }}
          />
        </div>
      </form>
    </Modal>
  );
}
