import React from "react";
import { useSubscription } from "../lib/SubscriptionContext";
import SubscriptionModal from "./SubscriptionModal";

export default function SubscriptionModalWrapper() {
  const {
    isSubscriptionModalOpen,
    subscriptionModalIntent,
    closeSubscriptionModal,
  } = useSubscription();

  return (
    <SubscriptionModal
      isOpen={isSubscriptionModalOpen}
      onClose={closeSubscriptionModal}
      intent={subscriptionModalIntent}
    />
  );
}
