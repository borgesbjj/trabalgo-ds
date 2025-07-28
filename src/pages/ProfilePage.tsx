import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aqui você salvaria os dados atualizados
    console.log('Dados atualizados:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
                  <p className="text-gray-600">Gerencie suas informações pessoais</p>
                </div>
              </div>
              {user.isAdmin && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Administrador
                </span>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{user.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de conta
                </label>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">
                    {user.isAdmin ? 'Administrador' : 'Cliente'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Salvar</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancelar</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Editar Perfil</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Meus Pedidos</h3>
            <p className="text-gray-600 text-sm">Visualize o histórico de suas compras</p>
          </button>

          {user.isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Painel Admin</h3>
              <p className="text-gray-600 text-sm">Gerenciar produtos e pedidos</p>
            </button>
          )}

          <button
            onClick={logout}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left border border-red-200"
          >
            <h3 className="font-semibold text-red-600 mb-2">Sair da Conta</h3>
            <p className="text-gray-600 text-sm">Fazer logout da sua conta</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;