"use client";

import React from "react";
import { useCreateInquiry } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InquiryFormProps {
  propertyId: number;
}

export function InquiryForm({ propertyId }: InquiryFormProps) {
  const [formData, setFormData] = React.useState({
    customer_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    createInquiry(
      {
        property_id: propertyId,
        ...formData,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setFormData({
            customer_name: "",
            email: "",
            phone: "",
            message: "",
          });
          setTimeout(() => setSubmitted(false), 5000);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interested in this property?</CardTitle>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="rounded-lg bg-green-50 p-4 text-green-700">
            <p className="font-medium">Thank you for your inquiry!</p>
            <p className="text-sm">We will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your Name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              error={errors.customer_name}
              placeholder="John Doe"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john@example.com"
            />

            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+1-555-0000"
            />

            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Tell us about your interest..."
            />

            <Button
              type="submit"
              isLoading={isPending}
              className="w-full"
            >
              Send Inquiry
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
