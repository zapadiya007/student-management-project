
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    mappls: any;
  }
}

interface MapMyIndiaProps {
  className?: string;
  onLocationSelect?: (lat: number, lng: number, address?: string) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title?: string;
    description?: string;
  }>;
}

export function MapMyIndia({ 
  className = "w-full h-64", 
  onLocationSelect, 
  center = { lat: 28.6139, lng: 77.2090 }, 
  zoom = 10,
  markers = []
}: MapMyIndiaProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const scriptLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = () => {
      if (window.mappls && mapRef.current) {
        try {
          mapInstance.current = new window.mappls.Map(mapRef.current, {
            center: [center.lat, center.lng],
            zoom: zoom,
            search: true,
            traffic: true,
            geolocation: true,
            clickableIcons: true,
            backgroundColor: '#f8f9fa'
          });

          // Add markers if provided
          markers.forEach(marker => {
            const mapMarker = new window.mappls.Marker({
              map: mapInstance.current,
              position: [marker.lat, marker.lng],
              title: marker.title || '',
              icon: {
                url: 'https://apis.mapmyindia.com/map_v3/1.3/images/2x/pinlet_red.png',
                size: { width: 32, height: 32 }
              }
            });

            if (marker.description) {
              const infoWindow = new window.mappls.InfoWindow({
                content: marker.description
              });
              
              mapMarker.addListener('click', () => {
                infoWindow.open(mapInstance.current, mapMarker);
              });
            }
          });

          // Handle map clicks for location selection
          if (onLocationSelect) {
            mapInstance.current.addListener('click', (event: any) => {
              const lat = event.latLng.lat();
              const lng = event.latLng.lng();
              onLocationSelect(lat, lng);
            });
          }
        } catch (error) {
          console.error('Error initializing MapMyIndia map:', error);
        }
      }
    };

    // Load MapMyIndia script if not already loaded
    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://apis.mapmyindia.com/advancedmaps/v1/YOUR_API_KEY/map_load?v=1.5';
      script.async = true;
      
      script.onload = () => {
        scriptLoaded.current = true;
        initializeMap();
      };

      script.onerror = () => {
        console.error('Failed to load MapMyIndia script. Please check your API key.');
      };

      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      if (mapInstance.current) {
        try {
          mapInstance.current.remove();
        } catch (error) {
          console.error('Error removing map:', error);
        }
      }
    };
  }, [center, zoom, markers, onLocationSelect]);

  return (
    <div className={`${className} rounded-lg overflow-hidden border border-border relative`}>
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-muted-foreground z-10">
        Powered by MapMyIndia
      </div>
      {!scriptLoaded.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-20">
          <div className="text-sm text-muted-foreground">Loading map...</div>
        </div>
      )}
    </div>
  );
}
