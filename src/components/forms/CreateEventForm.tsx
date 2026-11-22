"use client";

import { EventForm, Category } from "./EventForm";

const CreateEventForm = ({ categories }: { categories: Category[] }) => {
  return <EventForm mode="create" categories={categories} />;
};

export default CreateEventForm;
