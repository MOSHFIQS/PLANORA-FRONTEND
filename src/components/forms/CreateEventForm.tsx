"use client"
import { deleteImagesAction, uploadImagesAction } from '@/actions/file.action';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import ImageView from '../imageView/imageView';
import { Button } from '../ui/button';
import ImageUploader from '../imageUploader/ImageUploader';
import { useImageUpload } from '@/hooks/useImageUpload';


const CreateEventForm = () => {
     const productImages = useImageUpload({ max: 5 });
     return <div className=''>
          <ImageUploader
               label="Product Images"
               images={productImages.images}
               onUpload={productImages.upload}
               onDelete={productImages.remove}
               multiple
          />
     </div>
}
export default CreateEventForm;