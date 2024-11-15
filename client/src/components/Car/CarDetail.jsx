import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCar } from "../../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "sonner";
import { Car, ArrowLeft, Pencil } from "lucide-react";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCarDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await getCar(id, token);
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error.message);
        toast.error("Failed to load car details");
      }
    };

    fetchCarDetails();
  }, [id, navigate]);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-muted-foreground">Loading car details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-4xl mx-auto">
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
                <CardTitle>Car Details</CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{car.title}</h2>
              <div className="flex flex-wrap gap-2">
                {car.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground whitespace-pre-wrap">
              {car.description}
            </p>
          </div>

          {car.images && car.images.length > 0 && (
            <Carousel className="w-full max-w-2xl mx-auto">
              <CarouselContent>
                {car.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <img
                        src={`${BASE_URL}${image}`}
                        alt={`Car Image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}

          <div className="flex justify-end">
            <Button
              onClick={() => navigate(`/cars/edit/${id}`)}
              className="flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Car
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarDetail;