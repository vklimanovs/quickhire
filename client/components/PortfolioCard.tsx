import React, { useState, useRef } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { useToast } from "../hooks/use-toast";
import {
  Edit,
  Trash2,
  Save,
  X,
  Camera,
  Loader2,
  ExternalLink,
} from "lucide-react";
import LanguageText from "./LanguageText";
import FormField from "./FormField";
import Button from "./Button";
import Card from "./Card";

interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface PortfolioCardProps {
  item: PortfolioItem;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (id: string) => void;
  isEditing?: boolean;
  onSave?: (item: PortfolioItem) => void;
  onCancel?: () => void;
}

export default function PortfolioCard({
  item,
  onEdit,
  onDelete,
  isEditing = false,
  onSave,
  onCancel,
}: PortfolioCardProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit form state
  const [editData, setEditData] = useState(item);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData({ ...editData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!onSave) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSave(editData);

      toast({
        title:
          currentLanguage === "ru"
            ? "Проект обновлён!"
            : currentLanguage === "en"
              ? "Project updated!"
              : "Projekt uuendatud!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Ошибка сохранения"
            : currentLanguage === "en"
              ? "Save failed"
              : "Salvestamine ebaõnnestus",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    onDelete(item.id || "");
  };

  if (isEditing) {
    return (
      <Card className="border-2 border-purple-200 bg-purple-50" padding="lg">
        {/* Image Upload */}
        <div className="relative mb-6">
          <img
            src={editData.image}
            alt={editData.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              text={{
                ru: "Изменить фото",
                en: "Change Photo",
                et: "Muuda pilti",
              }}
              icon={<Camera className="h-4 w-4" />}
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <FormField
            label={{
              ru: "Название проекта",
              en: "Project title",
              et: "Projekti nimetus",
            }}
            type="text"
            value={editData.title}
            onChange={(value) => setEditData({ ...editData, title: value })}
            disabled={isLoading}
          />

          <FormField
            label={{
              ru: "Описание проекта",
              en: "Project description",
              et: "Projekti kirjeldus",
            }}
            type="textarea"
            value={editData.description}
            onChange={(value) =>
              setEditData({ ...editData, description: value })
            }
            disabled={isLoading}
          />

          <FormField
            label={{
              ru: "Ссылка на проект (необязательно)",
              en: "Project link (optional)",
              et: "Projekti link (valikuline)",
            }}
            type="url"
            value={editData.link || ""}
            onChange={(value) => setEditData({ ...editData, link: value })}
            disabled={isLoading}
          />

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              text={{
                ru: "Отмена",
                en: "Cancel",
                et: "Tühista",
              }}
              icon={<X className="h-4 w-4" />}
            />
            <Button
              onClick={handleSave}
              disabled={isLoading}
              loading={isLoading}
              text={{
                ru: "Сохранить",
                en: "Save",
                et: "Salvesta",
              }}
              icon={<Save className="h-4 w-4" />}
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="hover:shadow-md transition-shadow relative group"
      padding="none"
    >
      {/* Action buttons */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2 z-10">
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-white hover:text-blue-300 bg-black bg-opacity-50 rounded-lg transition-colors"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-white hover:text-red-300 bg-black bg-opacity-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-lg text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            <LanguageText ru="Посмотреть" en="View" et="Vaata" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    </Card>
  );
}
