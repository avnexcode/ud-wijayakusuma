import { Button } from "@/components/ui/button";
import { useMemo, useRef, useState } from "react";

export const UploadNoteImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | undefined | null>(
    null,
  );

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOpenFileExplorer = () => {
    inputFileRef.current?.click();
  };

  const handleRemoveSelectedImage = () => {
    setSelectedImage(null);
  };

  const onPickNoteImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUploadNoteImage = async () => {
    if (selectedImage) {
      const reader = new FileReader();

      reader.onloadend = function () {
        // const result = reader.result as string;
        // const imageBase64 = result.substring(result.indexOf(",") + 1);
        // updateProfilePicture.mutate(imageBase64);
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const selectedProfilePicturePreview = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
  }, [selectedImage]);

  return (
    <div className="flex flex-col gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={selectedProfilePicturePreview} alt="" />

      <Button variant="secondary" onClick={handleOpenFileExplorer} size="sm">
        Upload Nota
      </Button>
      {!!selectedImage && (
        <>
          <Button
            onClick={handleRemoveSelectedImage}
            variant="destructive"
            size="sm"
          >
            Hapus
          </Button>
          <Button onClick={handleUploadNoteImage} size="sm">
            Simpan
          </Button>
        </>
      )}
      <input
        accept="image/*"
        onChange={onPickNoteImage}
        className="hidden"
        type="file"
        ref={inputFileRef}
      />
    </div>
  );
};
