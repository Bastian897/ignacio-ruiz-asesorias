"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createBookingRequest(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const packageId = String(formData.get("package_id") ?? "");
  const requestedNote = String(formData.get("requested_note") ?? "").trim() || null;

  if (!packageId) {
    throw new Error("Elige un paquete.");
  }

  const { error } = await supabase.from("bookings").insert({
    client_id: user!.id,
    package_id: packageId,
    requested_note: requestedNote,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/portal");
  redirect("/portal");
}

export async function updateBookingStatus(formData: FormData) {
  const supabase = await createClient();
  const bookingId = String(formData.get("booking_id") ?? "");
  const status = String(formData.get("status") ?? "");
  const paymentStatus = String(formData.get("payment_status") ?? "");
  const paymentMethod = String(formData.get("payment_method") ?? "").trim() || null;
  const paymentReference = String(formData.get("payment_reference") ?? "").trim() || null;
  const adminNotes = String(formData.get("admin_notes") ?? "").trim() || null;
  const scheduledRaw = String(formData.get("scheduled_at") ?? "").trim();
  const scheduledAt = scheduledRaw ? new Date(scheduledRaw).toISOString() : null;

  await supabase
    .from("bookings")
    .update({
      status,
      payment_status: paymentStatus,
      payment_method: paymentMethod,
      payment_reference: paymentReference,
      admin_notes: adminNotes,
      scheduled_at: scheduledAt,
    })
    .eq("id", bookingId);

  revalidatePath(`/portal/admin/reservas/${bookingId}`);
  revalidatePath("/portal/admin");
}

export async function addDeliverable(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const bookingId = String(formData.get("booking_id") ?? "");
  const summary = String(formData.get("summary") ?? "").trim();
  const actionPlan = String(formData.get("action_plan") ?? "").trim();

  if (!summary || !actionPlan) {
    throw new Error("El resumen y el plan de acción son obligatorios.");
  }

  const { error } = await supabase.from("deliverables").insert({
    booking_id: bookingId,
    summary,
    action_plan: actionPlan,
    created_by: user!.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/portal/admin/reservas/${bookingId}`);
  revalidatePath(`/portal/reservas/${bookingId}`);
}
