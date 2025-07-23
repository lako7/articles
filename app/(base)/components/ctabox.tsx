import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";

export function CtaBox() {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md bg-gradient-to-br from-teal-400 to-teal-600 text-white overflow-hidden relative shadow-lg shadow-green-500/30 rounded-xl">
        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-5 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-300 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative z-10 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">Unlock Divine Insight</CardTitle>
              <p className="text-green-100 text-sm">
                AI-powered Bible study tools
              </p>
            </div>
            <div className="transform transition-transform hover:rotate-180 hover:scale-110">
              <BookOpen className="h-6 w-6 text-green-200" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 pt-4">
          <p className="text-green-100 mb-6">
            Enhance your spiritual journey with early access to AI features and connect with a like-minded community.
          </p>
          <div className="transform transition-transform hover:scale-105">
            <Button variant="secondary" className="bg-white text-emerald-600 hover:bg-green-100 transition-colors duration-300 font-semibold">
             <a href="https://www.Rhemafy.ai">
              Join the Waitlist
              </a>
              <div className="ml-2 inline-block transform transition-transform hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </CardContent>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400 rounded-full filter blur-2xl opacity-20 -translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
}
