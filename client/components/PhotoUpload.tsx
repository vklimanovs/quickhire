import React, { useState } from "react";
import { Upload, Camera } from "lucide-react";
import LanguageText from "./LanguageText";

interface PhotoUploadProps {
  currentPhoto: string;
  onPhotoChange: (photoData: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  showUploadButton?: boolean;
  showCameraIcon?: boolean;
}

export default function PhotoUpload({
  currentPhoto,
  onPhotoChange,
  size = "md",
  className = "",
  disabled = false,
  showUploadButton = true,
  showCameraIcon = false,
}: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28",
    lg: "h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40",
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !disabled) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoData = event.target?.result as string;
        onPhotoChange(photoData);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPhotoUrl = () => {
    if (currentPhoto) return currentPhoto;
    return "https://avatar.vercel.sh/default.png?size=150";
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 ${className}`}
    >
      <div className="relative">
        <img
          src={getPhotoUrl()}
          alt="Profile"
          className={`${sizeClasses[size]} rounded-full object-cover border-4 border-white shadow-lg mx-auto sm:mx-0 ${
            disabled ? "opacity-50" : ""
          }`}
        />

        {showCameraIcon && (
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
            <Camera className="h-4 w-4" />
          </div>
        )}
      </div>

      {showUploadButton && (
        <div className="text-center sm:text-left">
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            disabled={disabled}
          />
          <label
            htmlFor="photo-upload"
            className={`inline-flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer bg-white px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors ${
              disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? (
              <LanguageText
                ru="Загрузка..."
                en="Uploading..."
                et="Üleslaadimine..."
              />
            ) : (
              <LanguageText
                ru="Изменить фото"
                en="Change Photo"
                et="Muuda pilti"
              />
            )}
          </label>

          <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 5MB</p>
        </div>
      )}
    </div>
  );
}
