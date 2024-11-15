import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCar, updateCar } from "../../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Car, Upload, ArrowLeft } from "lucide-react";

const CarEdit = () => {
  const { id } = useParams();
  const [car, setCar] = useState({ title: "", description: "", tags: [], images: [] });
  const [newImages, setNewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await getCar(id, token);
        setCar(data);
      } catch (error) {
        toast.error("Failed to fetch car details");
      }
    };

    fetchCar();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", car.title);
    formData.append("description", car.description);
    formData.append("tags", car.tags.join(","));

    for (let i = 0; i < newImages.length; i++) {
      formData.append("images", newImages[i]);
    }

    try {
      await updateCar(id, formData, token);
      toast.success("Car updated successfully!");
      navigate(`/cars/${id}`);
    } catch (error) {
      toast.error("Failed to update car: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="absolute"
              onClick={() => navigate("/cars")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="w-full flex justify-center">
              <div className="flex items-center gap-2">
                <Car className="w-6 h-6 text-primary" />
                <CardTitle>Edit Car</CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={car.title}
                onChange={(e) => setCar({ ...car, title: e.target.value })}
                placeholder="Enter car title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={car.description}
                onChange={(e) => setCar({ ...car, description: e.target.value })}
                placeholder="Enter car description"
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={car.tags.join(", ")}
                onChange={(e) =>
                  setCar({
                    ...car,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
                placeholder="Enter tags (comma separated)"
              />
              <p className="text-sm text-muted-foreground">
                Separate tags with commas (e.g., sedan, luxury, electric)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Add New Images</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => setNewImages([...e.target.files])}
                  />
                </label>
              </div>
              {newImages.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {newImages.length} new file(s) selected
                </p>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/cars/${id}`)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Car"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarEdit;