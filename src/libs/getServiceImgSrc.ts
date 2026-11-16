const serviceToImgSrcMap = new Map([
    ["Periodic Maintenance", "/img/periodic-maintenance.jpg"],
    ["Battery & Electrical System Check", "/img/battery-electrical.jpg"],
    ["Brake & Suspension Service", "/img/brake-suspension.jpg"],
    ["Wheel Alignment & Tire Balancing", "/img/wheel-alignment.jpg"],
    ["AC Cleaning & Ozone Sterilization", "/img/ac-cleaning.jpg"],
]);

export default function getServiceImgSrc(serviceName: string): string {
    return serviceToImgSrcMap.get(serviceName) ?? "/img/default.jpg";
}
