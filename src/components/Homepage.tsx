import React from "react" ;
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button" // Assuming you've set up shadcn/ui

const Homepage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/login");
    };

    return (
        <>
        <div className="flex flex-col justify-between min-h-screen">        
            <div className="flex flex-col items-center justify-center flex-grow">
                <h1 className="text-4xl font-bold mb-4">Welcome to DriftNet</h1> {}
                <p className="text-lg mt-4 mb-8"> {}
                    Effortlessly transfer your files with high security and speed.
                </p>
                <Button onClick={handleGetStarted} size="lg"> {}
                    Get Started
                </Button>
            </div>
        </div>
        </>
    );
};

export default Homepage;

