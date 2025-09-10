"use client";
import useForm from "@/hooks/useForm";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";

interface SearchProductModalProps {
    ToggleButton: React.ReactNode
}


const SearchInput = () => {
    const { form, onChange } = useForm({ name: "" });
    const [isFocused, setIsFocused] = useState(false);

    const hasValue = form.name.length > 0;

    return (
        <div className="relative w-full">
            <label
                className={`absolute left-3 transition-all duration-200 pointer-events-none
            ${isFocused || hasValue ? "-top-2 text-xs text-black bg-white px-1" : "top-2 text-gray-400 text-base"}
          `}
            >
                Buscar producto
            </label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder=" "
                className={`w-full border rounded px-3 py-3 pr-10 transition-colors duration-200
            ${isFocused ? "border-black" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-black-500
          `}
            />
            <LuSearch
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
        </div>
    );
};


export default function SearchProductModal() {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:scale-105 cursor-pointer">
                <LuSearch size={24} strokeWidth={1} />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 bg-opacity-50">
                    <div className="bg-white gap-4 w-full h-40 flex justify-center items-center rounded-lg p-6  relative">
                        <SearchInput />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className=" right-2 text-2xl text-gray-500 cursor-pointer hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}