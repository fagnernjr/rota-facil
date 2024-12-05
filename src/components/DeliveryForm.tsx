import React, { useState } from 'react';
import { Plus, Minus, Package, User, Phone, MapPin, Calendar, Truck, Barcode, CreditCard, BanknoteIcon, Wallet } from 'lucide-react';
import { DeliveryPoint, ProductDetails, DeliveryService } from '../types/delivery';
import { useTranslation } from '../hooks/useTranslation';

interface DeliveryFormProps {
  onSubmit: (delivery: Omit<DeliveryPoint, 'id' | 'status' | 'routeStatus'>) => void;
}

const SIZES = ['One Size Fits All', 'PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG'];

export function DeliveryForm({ onSubmit }: DeliveryFormProps) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ProductDetails[]>([
    { quantity: 1, size: '', color: '' }
  ]);
  const [paymentAmount, setPaymentAmount] = useState('');

  const addProduct = () => {
    setProducts([...products, { quantity: 1, size: '', color: '' }]);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof ProductDetails, value: string | number) => {
    setProducts(products.map((product, i) => 
      i === index ? { ...product, [field]: value } : product
    ));
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const amount = Number(numbers) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPaymentAmount(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      customerName: formData.get('customerName') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      paymentMethod: formData.get('paymentMethod') as 'pix' | 'cash' | 'card',
      paymentAmount: Number(paymentAmount) / 100,
      notes: formData.get('notes') as string || '',
      confirmed: false,
      products,
      deliveryDate: formData.get('deliveryDate') as string,
      deliveryService: formData.get('deliveryService') as DeliveryService,
      trackingCode: formData.get('trackingCode') as string || undefined
    });
    
    e.currentTarget.reset();
    setProducts([{ quantity: 1, size: '', color: '' }]);
    setPaymentAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 inline mr-2 text-gray-400" />
              {t('customerName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Phone className="w-4 h-4 inline mr-2 text-gray-400" />
              {t('phone')} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-2 text-gray-400" />
              {t('address')} <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              required
              rows={2}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter complete delivery address"
            />
          </div>
        </div>
      </div>

      {/* Delivery Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 inline mr-2 text-gray-400" />
              {t('deliveryDate')} <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="deliveryDate"
              required
              min={new Date().toISOString().split('T')[0]}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Truck className="w-4 h-4 inline mr-2 text-gray-400" />
              {t('deliveryService')} <span className="text-red-500">*</span>
            </label>
            <select
              name="deliveryService"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">{t('selectDeliveryService')}</option>
              <option value="logzz">Logzz</option>
              <option value="correios">Correios</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Barcode className="w-4 h-4 inline mr-2 text-gray-400" />
              {t('trackingCode')}
            </label>
            <input
              type="text"
              name="trackingCode"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={t('enterTrackingCode')}
            />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{t('products')}</h3>
          <button
            type="button"
            onClick={addProduct}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-1" />
            {t('addProduct')}
          </button>
        </div>

        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="relative bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <Package className="w-4 h-4 mr-1 text-gray-400" />
                  {t('product')} {index + 1}
                </h4>
                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('quantity')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('size')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={product.size}
                    onChange={(e) => updateProduct(index, 'size', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">{t('selectSize')}</option>
                    {SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size === 'One Size Fits All' ? t('oneSizeFitsAll') : size}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('color')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={product.color}
                    onChange={(e) => updateProduct(index, 'color', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    placeholder="Enter color"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <CreditCard className="w-4 h-4 inline mr-2 text-gray-400" />
              {t('paymentMethod')} <span className="text-red-500">*</span>
            </label>
            <select
              name="paymentMethod"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">{t('selectPaymentMethod')}</option>
              <option value="pix">PIX</option>
              <option value="cash">{t('cash')}</option>
              <option value="card">{t('card')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <BanknoteIcon className="w-4 h-4 inline mr-2 text-gray-400" />
              {t('paymentAmount')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={formatCurrency(paymentAmount)}
              onChange={handleCurrencyInput}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="R$ 0,00"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('notes')}
            </label>
            <textarea
              name="notes"
              rows={2}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={t('specialInstructions')}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          {t('addDelivery')}
        </button>
      </div>
    </form>
  );
}