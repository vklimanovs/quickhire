import React, { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { Euro, Clock, Send, FileText } from "lucide-react";
import LanguageText from "./LanguageText";
import FormField from "./FormField";
import Button from "./Button";
import Modal from "./Modal";
import { Proposal } from "../Types/Task";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    title: string;
    budget: number;
    timeline: string;
  };
  onSubmit: (proposalData: {
    coverLetter?: string;
    bidAmount?: number;
    timeline?: string;
  }) => void;
  isEditing?: boolean;
  existingProposal?: Partial<Proposal>;
}

export default function ProposalModal({
  isOpen,
  onClose,
  task,
  onSubmit,
  isEditing = false,
  existingProposal,
}: ProposalModalProps) {
  const { currentLanguage } = useLanguage();

  const [coverLetter, setCoverLetter] = useState(
    existingProposal?.coverLetter || "",
  );
  const [bidAmount, setBidAmount] = useState(
    existingProposal?.bidAmount?.toString() || "",
  );
  const [timeline, setTimeline] = useState(existingProposal?.timeline || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const proposalData = {
        coverLetter: coverLetter.trim() || undefined,
        bidAmount: bidAmount ? parseFloat(bidAmount) : undefined,
        timeline: timeline.trim() || undefined,
      };

      await onSubmit(proposalData);

      // Reset form if not editing
      if (!isEditing) {
        setCoverLetter("");
        setBidAmount("");
        setTimeline("");
      }

      onClose();
    } catch (error) {
      console.error("Error submitting proposal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={{
        ru: isEditing ? "Редактировать предложение" : "Отправить предложение",
        en: isEditing ? "Edit Proposal" : "Submit Proposal",
        et: isEditing ? "Muuda pakkumist" : "Esita pakkumine",
      }}
      size="lg"
    >
      {/* Task Summary */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Euro className="h-4 w-4 mr-1" />
            {task.budget} € (fixed)
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <LanguageText ru="Срок" en="Timeline" et="Tähtaeg" />:{" "}
            {task.timeline}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Proposal Details */}
        <FormField
          label={{
            ru: "Детали предложения",
            en: "Proposal Details",
            et: "Pakkumise üksikasjad",
          }}
          type="textarea"
          value={coverLetter}
          onChange={(value) => setCoverLetter(value)}
          placeholder={{
            ru: "Добавьте детали о вашем предложении...",
            en: "Add details about your proposal...",
            et: "Lisa oma pakkumise üksikasjad...",
          }}
          rows={4}
          icon={<FileText className="h-4 w-4" />}
        />

        {/* Bid Amount */}
        <FormField
          label={{
            ru: "Ваша цена (€)",
            en: "Your price (€)",
            et: "Teie hind (€)",
          }}
          type="text"
          value={bidAmount}
          onChange={(value) => setBidAmount(value)}
          placeholder={{
            ru: "0.00",
            en: "0.00",
            et: "0.00",
          }}
          icon={<Euro className="h-4 w-4" />}
        />

        {/* Estimated Delivery */}
        <FormField
          label={{
            ru: "Ожидаемые сроки доставки",
            en: "Estimated Delivery",
            et: "Eeldatav tarnekuupäev",
          }}
          type="text"
          value={timeline}
          onChange={(value) => setTimeline(value)}
          placeholder={{
            ru: 'напр. "3 дня" или "1 неделя"',
            en: 'e.g. "3 days" or "1 week"',
            et: 'nt. "3 päeva" või "1 nädal"',
          }}
          icon={<Clock className="h-4 w-4" />}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            text={{
              ru: "Отмена",
              en: "Cancel",
              et: "Tühista",
            }}
            className="flex-1"
          />
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
            icon={<Send className="h-4 w-4" />}
            text={{
              ru: isEditing ? "Обновить предложение" : "Отправить предложение",
              en: isEditing ? "Update Proposal" : "Submit Proposal",
              et: isEditing ? "Uuenda pakkumist" : "Esita pakkumine",
            }}
            className="flex-1"
          />
        </div>
      </form>
    </Modal>
  );
}
