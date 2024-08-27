import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "antd";

const PrivacyPolicyModal = forwardRef(({}, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    showModal,
  }));

  return (
    <Modal
      title="Privacy Policy"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="mt-4 p-2" style={{ fontFamily: 'Arial, sans-serif', textAlign: 'justify' }}>
        {/* <p><strong>Effective Date:</strong> 01-09-2024</p> */}

        <h5>1. Information We Collect</h5>
        <ul>
          <li><strong>Personal Info:</strong> Name, email, phone number.</li>
          <li><strong>Truck Data:</strong> Expenses, maintenance, and operational details you provide.</li>
          <li><strong>Usage Data:</strong> Interaction data, IP addresses, and cookies.</li>
          <li><strong>Location Data:</strong> If enabled, for location-based features.</li>
        </ul>

        <h5>2. How We Use Your Information</h5>
        <ul>
          <li><strong>Service Provision:</strong> To operate and improve our platform.</li>
          <li><strong>Communication:</strong> For account updates and support.</li>
          <li><strong>Analytics:</strong> To understand usage patterns.</li>
          <li><strong>Support:</strong> To respond to your inquiries.</li>
        </ul>

        <h5>3. Sharing Your Information</h5>
        <ul>
          <li><strong>Service Providers:</strong> With third-party services aiding our operations.</li>
          <li><strong>Legal Compliance:</strong> If required by law.</li>
          <li><strong>Business Transfers:</strong> In case of a merger or sale.</li>
        </ul>

        <h5>4. Data Security</h5>
        <p>We use security measures to protect your information but cannot guarantee complete security.</p>

        <h5>5. Your Rights</h5>
        <ul>
          <li><strong>Access & Correction:</strong> Update your personal information through your account.</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from promotional communications.</li>
          <li><strong>Deletion:</strong> Request account deletion by contacting us.</li>
        </ul>

        <h5>6. Third-Party Links</h5>
        <p>We are not responsible for the privacy practices of other sites linked from our platform.</p>

        <h5>7. Children’s Privacy</h5>
        <p>Our platform is not for children under 13. We do not knowingly collect their data.</p>

        <h5>8. Changes</h5>
        <p>We may update this policy and will notify you via our platform.</p>

        <h5>9. Contact Us</h5>
        <p>For questions, contact us at:</p>
        <p><strong>Manage My Truck (MMT)</strong></p>
        <p>Email: dev.codhub@gmail.com</p>

        <p>Thank you for using Manage My Truck (MMT). We are committed to protecting your privacy.</p>
      </div>
    </Modal>
  );
});

export default PrivacyPolicyModal;
