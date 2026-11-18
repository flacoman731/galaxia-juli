"use client";

interface PlanetProps {
    name: string;
    description: string;
    color: string;
    className?: string;
    onClick?: () => void;
}

export default function Planet({
    name,
    description,
    color,
    className,      
    onClick,
}: PlanetProps) {
    return (
        <button
        className={`planet-card ${className}`}
        onClick={onClick}
        aria-label={`Explorar ${name}`}
        >
            <span className="planet-name">{name}</span>
            <span className="planet-description">{description}</span>
            </button>
    );
}