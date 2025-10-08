'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createClient } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { CategoriesSelect } from '../components/CategoriesSelect';
import { ProductDatabase } from '@/types/product.interface';
import Image from 'next/image';


export default function ProductPage() {
	const { id } = useParams();
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [product, setProduct] = useState<ProductDatabase | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		price: 0,
		category_id: 0,
		quantity: 0,
		sku: '',
		brand: '',
		color: '#000000'
	});
	const supabase = createClient();

	const normalizedID = Number(id)

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { data, error } = await supabase
					.from('products')
					.select(`*,category:category_id(*)`)
					.eq('id', normalizedID)
					.single();

				if (error) throw error;

				setProduct(data);
				setFormData({
					name: data.name || '',
					price: data.price || 0,
					category_id: data.category_id || 0,
					quantity: data.quantity || 0,
					sku: data.sku || '',
					brand: data.brand || '',
					color: data.color || '#000000'
				});
			} catch (err) {
				console.error('Error al cargar el producto:', err);
				setError('No se pudo cargar el producto');
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: name === 'price' ? parseFloat(value) || 0 : value
		}));
	};

	const handleAvailabilityChange = (checked: boolean) => {
		setFormData(prev => ({
			...prev,
			quantity: checked ? 1 : 0
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Check if file is an image
		if (!file.type.startsWith('image/')) {
			toast.error('Por favor, selecciona un archivo de imagen válido');
			return;
		}

		// Check file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			toast.error('La imagen no puede pesar más de 5MB');
			return;
		}

		setSelectedFile(file);
		setImagePreview(URL.createObjectURL(file));
	};

	const uploadImage = async (file: File) => {
		try {
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

			const { error: uploadError } = await supabase.storage
				.from('product-images')
				.upload(filePath, file);

			if (uploadError) throw uploadError;

			// Get public URL
			const { data: { publicUrl } } = supabase.storage
				.from('product-images')
				.getPublicUrl(filePath);

			return publicUrl;
		} catch (error) {
			console.error('Error uploading image:', error);
			throw error;
		}
	};

	const handleSave = async () => {
		try {
			setSaving(true);
			let imageUrl = product?.image_url || '';

			// Upload new image if selected
			if (selectedFile) {
				imageUrl = await uploadImage(selectedFile);
			}

			// Update product data
			const { error, data } = await supabase
				.from('products')
				.update({
					...formData,
					image_url: imageUrl
				})
				.eq('id', normalizedID);

			if (error) throw error;
			setSelectedFile(null);

			toast.success('Producto actualizado correctamente');
			router.refresh();
		} catch (error) {
			console.error('Error saving product:', error);
			toast.error('Error al guardar el producto');
		} finally {
			setSaving(false);
		}
	};

	const handleCategoryChange = (value: string) => {
		setFormData(prev => ({
			...prev,
			category_id: parseInt(value)
		}));
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className="p-6 text-center">
				<p className="text-red-500">{error || 'Producto no encontrado'}</p>
				<Button onClick={() => router.push('/admin/productos')} className="mt-4">
					Volver a la lista
				</Button>
			</div>
		);
	}

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Editar Producto</h1>
				<Button variant="outline" onClick={() => router.push('/admin/productos')}>
					Volver
				</Button>
			</div>

			<div className="bg-white rounded-lg shadow p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<div className="border rounded-lg overflow-hidden">
							<Image
								src={imagePreview || product.image_url || ""}
								alt={product.name || ""}
								width={500}
								height={500}
								priority
								className="w-full h-80 object-contain bg-gray-50"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src = 'https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg';
								}}
							/>
						</div>
						<div className="mt-4">
							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={() => fileInputRef.current?.click()}
							>
								Cambiar imagen
							</Button>
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleFileChange}
								accept="image/*"
								className="hidden"
							/>
						</div>
					</div>

					<div className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="name">Nombre del producto</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								placeholder="Nombre del producto"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex flex-row gap-4">
								<div className="space-y-2 w-2/4">
									<Label>SKU</Label>
									<Input
										id="sku"
										name="sku"
										placeholder="Ej: REL-XYZ-001"
									/>
								</div>
								<div className="space-y-2 w-2/4">
									<Label>Marca</Label>
									<Input
										id="brand"
										name="brand"
										placeholder="Ej: Casio, Rolex, etc."
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex flex-row gap-4">
								<div className="space-y-2 w-2/3">
									<Label htmlFor="price">Precio</Label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
										<Input
											id="price"
											name="price"
											type="number"
											value={formData.price}
											onChange={handleInputChange}
											placeholder="0.00"
											min="0"
											step="1"
											className="pl-8"
										/>
									</div>
								</div>

								<div className="space-y-2 w-1/3">
									<Label htmlFor="available">Stock</Label>
									<Switch
										id="available"
										checked={formData.quantity > 0}
										onCheckedChange={handleAvailabilityChange}
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex flex-row gap-4">
								<div className="space-y-2 w-2/3">
									<Label>Categoría</Label>
									<CategoriesSelect onValueChange={handleCategoryChange} value={formData.category_id.toString()} />
								</div>
								<div className="space-y-2 w-1/3">
									<Label>Color</Label>
									<Input
										id="color"
										name="color"
										type="color"
										defaultValue={formData.color}
										onBlur={handleInputChange}
									/>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className="mt-8 pt-6 border-t flex justify-end space-x-4">
					<Button variant="outline" onClick={() => router.push('/admin/productos')}>
						Cancelar
					</Button>
					<Button onClick={handleSave} disabled={saving}>
						{saving ? 'Guardando...' : 'Guardar cambios'}
					</Button>
				</div>
			</div>
		</div>
	);
}