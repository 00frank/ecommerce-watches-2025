"use client";
import useForm from "@/hooks/useForm.hook";
import useLockScroll from "@/hooks/useLockScroll.hook";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import { LuSearch } from "react-icons/lu";

const SearchInput = () => {

    const { form, onChange } = useForm({ name: "" })
    const [isFocused, setIsFocused] = useState(false)

    const hasValue = form.name.length > 0

    return (
        <div className="relative  max-w-3xl w-full">
            <label
                className={`absolute left-3 transition-all duration-200 pointer-events-none
            ${isFocused || hasValue ? "-top-2 text-xs text-black bg-white px-1" : "top-3.5 text-gray-400 text-base"}
          `}>
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
                className={`w-full border rounded-md px-3 py-3 pr-10 transition-colors duration-200
            ${isFocused ? "border-black" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-black-500
          `} />
            <LuSearch
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
        </div>
    )
}

const SearchProductModal = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    useLockScroll(isOpen)
    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:scale-105 cursor-pointer">
                <LuSearch
                    size={24}
                    strokeWidth={1} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-start justify-center bg-black/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="bg-white gap-4 w-full h-48 flex justify-center items-center rounded-lg p-6 relative"
                            initial={{ opacity: 0, y: -100, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -100, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <SearchInput />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
})

export default SearchProductModal