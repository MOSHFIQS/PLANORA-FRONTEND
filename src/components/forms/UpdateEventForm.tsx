"use client";

import { EventForm, Category } from "./EventForm";

type Props = {
  event: any;
  categories: Category[];
};

const UpdateEventForm = ({ event, categories }: Props) => {
  return <EventForm mode="update" event={event} categories={categories} />;
};

export default UpdateEventForm;
