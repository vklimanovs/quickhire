import React, { useState, useEffect } from "react";
import { Camera, Globe, Linkedin, Loader2 } from "lucide-react";
import Select from "react-select";
import { useLanguage } from "../lib/LanguageContext";
import { useProvider } from "../lib/ProviderContext";
import { useToast } from "../hooks/use-toast";
import LanguageText from "./LanguageText";
import FormField from "./FormField";
import Button from "./Button";
import Modal from "./Modal";
import PhotoUpload from "./PhotoUpload";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: any;
  onSave: (updatedProvider: any) => void;
}

interface SkillOption {
  value: string;
  label: string;
}

interface LanguageOption {
  value: string;
  label: string;
}

// Predefined skill suggestions
const SKILL_SUGGESTIONS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "PHP",
  "Go",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "Vue.js",
  "Angular",
  "Svelte",
  "HTML",
  "CSS",
  "SCSS",
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "Express.js",
  "NestJS",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
  "Rails",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "SQLite",
  "GraphQL",
  "REST API",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Git",
  "Figma",
  "Adobe XD",
  "Sketch",
  "Photoshop",
  "Illustrator",
  "Blender",
  "Unity",
  "Unreal Engine",
  "Three.js",
  "WebGL",
  "Canvas API",
  "Machine Learning",
  "AI",
  "Data Science",
  "TensorFlow",
  "PyTorch",
  "Pandas",
  "Project Management",
  "Agile",
  "Scrum",
  "Team Leadership",
  "Consulting",
];

// Predefined language suggestions
const LANGUAGE_SUGGESTIONS = [
  "English (Native)",
  "English (Fluent)",
  "English (Conversational)",
  "Estonian (Native)",
  "Estonian (Fluent)",
  "Estonian (Conversational)",
  "Russian (Native)",
  "Russian (Fluent)",
  "Russian (Conversational)",
  "German (Native)",
  "German (Fluent)",
  "German (Conversational)",
  "French (Native)",
  "French (Fluent)",
  "French (Conversational)",
  "Spanish (Native)",
  "Spanish (Fluent)",
  "Spanish (Conversational)",
  "Finnish (Native)",
  "Finnish (Fluent)",
  "Finnish (Conversational)",
  "Latvian (Native)",
  "Latvian (Fluent)",
  "Latvian (Conversational)",
  "Lithuanian (Native)",
  "Lithuanian (Fluent)",
  "Lithuanian (Conversational)",
  "Mandarin (Native)",
  "Mandarin (Fluent)",
  "Mandarin (Conversational)",
  "Japanese (Native)",
  "Japanese (Fluent)",
  "Japanese (Conversational)",
  "Korean (Native)",
  "Korean (Fluent)",
  "Korean (Conversational)",
  "Arabic (Native)",
  "Arabic (Fluent)",
  "Arabic (Conversational)",
  "Hindi (Native)",
  "Hindi (Fluent)",
  "Hindi (Conversational)",
];

export default function EditProfileModal({
  isOpen,
  onClose,
  provider,
  onSave,
}: EditProfileModalProps) {
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: provider?.firstName || provider?.name?.split(" ")[0] || "",
    lastName:
      provider?.lastName || provider?.name?.split(" ").slice(1).join(" ") || "",
    company: provider?.company || "",
    headline: provider?.headline || "",
    bio: provider?.bio || "",
    location: provider?.location || "",
    photo: provider?.photo || "",
    skills: provider?.skills || [],
    languages: provider?.languages || [],
    website: provider?.website || "",
    linkedin: provider?.linkedin || "",
  });

  // Multi-select options
  const skillOptions: SkillOption[] = SKILL_SUGGESTIONS.map((skill) => ({
    value: skill.toLowerCase(),
    label: skill,
  }));

  const languageOptions: LanguageOption[] = LANGUAGE_SUGGESTIONS.map(
    (lang) => ({
      value: lang.toLowerCase(),
      label: lang,
    }),
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (selectedOptions: any) => {
    const skills = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFormData((prev) => ({ ...prev, skills }));
  };

  const handleLanguagesChange = (selectedOptions: any) => {
    const languages = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFormData((prev) => ({ ...prev, languages }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      onSave(formData);

      toast({
        title:
          currentLanguage === "ru"
            ? "Профиль обновлён!"
            : currentLanguage === "en"
              ? "Profile updated!"
              : "Profiil uuendatud!",
        description:
          currentLanguage === "ru"
            ? "Ваши изменения сохранены"
            : currentLanguage === "en"
              ? "Your changes have been saved"
              : "Teie muudatused on salvestatud",
        variant: "default",
      });

      onClose();
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

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "42px",
      borderColor: "#e5e7eb",
      "&:hover": {
        borderColor: "#d1d5db",
      },
      "&:focus-within": {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#eff6ff",
      border: "1px solid #bfdbfe",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#1e40af",
      fontSize: "0.875rem",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#3b82f6",
      "&:hover": {
        backgroundColor: "#dbeafe",
        color: "#1e40af",
      },
    }),
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={{
        ru: "Редактировать профиль",
        en: "Edit Profile",
        et: "Muuda profiili",
      }}
      size="xl"
    >
      <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
        <div className="p-6 space-y-8">
          {/* Profile Photo */}
          <PhotoUpload
            currentPhoto={formData.photo}
            onPhotoChange={(photoData) => handleInputChange("photo", photoData)}
            size="lg"
            showCameraIcon={true}
            className="mb-6"
          />

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label={{
                ru: "Имя",
                en: "First Name",
                et: "Eesnimi",
              }}
              type="text"
              value={formData.firstName}
              onChange={(value) => handleInputChange("firstName", value)}
              placeholder={{
                ru: "Ваше имя",
                en: "Your first name",
                et: "Teie eesnimi",
              }}
              required={true}
              disabled={isLoading}
            />

            <FormField
              label={{
                ru: "Фамилия",
                en: "Last Name",
                et: "Perekonnanimi",
              }}
              type="text"
              value={formData.lastName}
              onChange={(value) => handleInputChange("lastName", value)}
              placeholder={{
                ru: "Ваша фамилия",
                en: "Your last name",
                et: "Teie perekonnanimi",
              }}
              required={true}
              disabled={isLoading}
            />

            <FormField
              label={{
                ru: "Компания (необязательно)",
                en: "Company (optional)",
                et: "Ettevõte (valikuline)",
              }}
              type="text"
              value={formData.company}
              onChange={(value) => handleInputChange("company", value)}
              placeholder={{
                ru: "Название компании",
                en: "Company name",
                et: "Ettevõtte nimi",
              }}
              disabled={isLoading}
            />

            <FormField
              label={{
                ru: "Профессия",
                en: "Professional Title",
                et: "Kutsealane tiitel",
              }}
              type="text"
              value={formData.headline}
              onChange={(value) => handleInputChange("headline", value)}
              placeholder={{
                ru: "Например: Full-Stack разработчик",
                en: "e.g. Full-Stack Developer",
                et: "nt. Full-Stack arendaja",
              }}
              disabled={isLoading}
            />

            <div className="md:col-span-2">
              <FormField
                label={{
                  ru: "Местоположение",
                  en: "Location",
                  et: "Asukoht",
                }}
                type="text"
                value={formData.location}
                onChange={(value) => handleInputChange("location", value)}
                placeholder={{
                  ru: "Город, Страна",
                  en: "City, Country",
                  et: "Linn, riik",
                }}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Bio */}
          <FormField
            label={{
              ru: "О себе",
              en: "About Me",
              et: "Minust",
            }}
            type="textarea"
            value={formData.bio}
            onChange={(value) => handleInputChange("bio", value)}
            placeholder={{
              ru: "Расскажите о своем опыте, навыках и услугах...",
              en: "Tell about your experience, skills, and services...",
              et: "Rääkige oma kogemustest, oskustest ja teenustest...",
            }}
            rows={4}
            disabled={isLoading}
          />

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <LanguageText ru="Навыки" en="Skills" et="Oskused" />
            </label>
            <Select
              isMulti
              value={skillOptions.filter((option) =>
                formData.skills.includes(option.value),
              )}
              onChange={handleSkillsChange}
              options={skillOptions}
              styles={customSelectStyles}
              placeholder={
                currentLanguage === "ru"
                  ? "Выберите или добавьте навыки..."
                  : currentLanguage === "en"
                    ? "Select or add skills..."
                    : "Valige või lisage oskused..."
              }
              isSearchable
              isClearable={false}
              isDisabled={isLoading}
              className="react-select-container"
              classNamePrefix="react-select"
            />
            <p className="text-xs text-gray-500 mt-1">
              <LanguageText
                ru="Выберите релевантные навыки для вашего профиля"
                en="Select relevant skills for your profile"
                et="Valige oma profiili jaoks asjakohased oskused"
              />
            </p>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <LanguageText ru="Языки" en="Languages" et="Keeled" />
            </label>
            <Select
              isMulti
              value={languageOptions.filter((option) =>
                formData.languages.includes(option.value),
              )}
              onChange={handleLanguagesChange}
              options={languageOptions}
              styles={customSelectStyles}
              placeholder={
                currentLanguage === "ru"
                  ? "Выберите языки..."
                  : currentLanguage === "en"
                    ? "Select languages..."
                    : "Valige keeled..."
              }
              isSearchable
              isClearable={false}
              isDisabled={isLoading}
              className="react-select-container"
              classNamePrefix="react-select"
            />
            <p className="text-xs text-gray-500 mt-1">
              <LanguageText
                ru="Укажите языки, на которых вы можете общаться с клиентами"
                en="Specify languages you can communicate with clients in"
                et="Täpsustage keeled, millega saate klientidega suhelda"
              />
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <LanguageText
                ru="Социальные сети"
                en="Social Links"
                et="Sotsiaalmeedia lingid"
              />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label={{
                  ru: "Веб-сайт",
                  en: "Website",
                  et: "Veebileht",
                }}
                type="url"
                value={formData.website}
                onChange={(value) => handleInputChange("website", value)}
                placeholder={{
                  ru: "https://yourwebsite.com",
                  en: "https://yourwebsite.com",
                  et: "https://yourwebsite.com",
                }}
                disabled={isLoading}
                icon={<Globe className="h-4 w-4" />}
              />

              <FormField
                label={{
                  ru: "LinkedIn",
                  en: "LinkedIn",
                  et: "LinkedIn",
                }}
                type="url"
                value={formData.linkedin}
                onChange={(value) => handleInputChange("linkedin", value)}
                placeholder={{
                  ru: "https://linkedin.com/in/yourprofile",
                  en: "https://linkedin.com/in/yourprofile",
                  et: "https://linkedin.com/in/yourprofile",
                }}
                disabled={isLoading}
                icon={<Linkedin className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-3 border-t">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          text={{
            ru: "Отмена",
            en: "Cancel",
            et: "Tühista",
          }}
        />
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isLoading}
          loading={isLoading}
          text={{
            ru: "Сохранить изменения",
            en: "Save Changes",
            et: "Salvesta muudatused",
          }}
        />
      </div>
    </Modal>
  );
}
