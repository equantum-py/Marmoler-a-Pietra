'use client';

import { useEffect, useState } from 'react';
import { getCRMMetrics, CRMMetrics } from '@/lib/supabase/crm/queries';

/**
 * STEP 6: Dashboard temporal /admin/crm-test
 * Objetivo: Visualizar métricas mínimas para demostrar captura de datos reales
 * 
 * Mostrar únicamente:
 * - Total Visitantes
 * - Total Páginas Vistas
 * - Total WhatsApp Clicks
 * - Últimos Eventos (listado simple)
 * 
 * NO incluir: conversion rate, top pages, top contexts, ROI, CAC, LTV, funnels, heatmaps
 */

export default function CRMTestDashboard() {
    const [metrics, setMetrics] = useState<CRMMetrics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshTime, setRefreshTime] = useState<string>(new Date().toLocaleTimeString());

  const loadMetrics = async () => {
        try {
                setLoading(true);
                setError(null);
                const data = await getCRMMetrics();
                setMetrics(data);
                setRefreshTime(new Date().toLocaleTimeString());
        } catch (err) {
                setError(err instanceof Error ? err.message : 'Error loading metrics');
        } finally {
                setLoading(false);
        }
  };

  useEffect(() => {
        loadMetrics();
        // Auto-refresh cada 30 segundos
                const interval = setInterval(loadMetrics, 30000);
        return () => clearInterval(interval);
  }, []);

  if (loading && !metrics) {
        return (
                <div className="min-h-screen bg-gray-900 text-white p-8">
                        <div className="max-w-4xl mx-auto">
                                  <h1 className="text-3xl font-bold mb-8">CRM Sprint 0 - Dashboard Temporal</h1>h1>
                                  <div className="text-center">Cargando métricas...</div>div>
                        </div>div>
                </div>div>
              );
  }
  
    return (
          <div className="min-h-screen bg-gray-900 text-white p-8">
                <div className="max-w-4xl mx-auto">
                  {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                                  <div>
                                              <h1 className="text-3xl font-bold">CRM Sprint 0</h1>h1>
                                              <p className="text-gray-400 text-sm mt-1">Dashboard Temporal - Captura de Datos en Tiempo Real</p>p>
                                  </div>div>
                                  <button
                                                onClick={loadMetrics}
                                                disabled={loading}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium disabled:opacity-50"
                                              >
                                    {loading ? 'Actualizando...' : 'Actualizar'}
                                  </button>button>
                        </div>div>
                
                  {/* Last refresh time */}
                        <p className="text-gray-500 text-xs mb-6">Actualizado: {refreshTime}</p>p>
                
                  {/* Error message */}
                  {error && (
                      <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
                                  Error: {error}
                      </div>div>
                        )}
                
                  {/* Metrics Cards */}
                        <div className="grid grid-cols-3 gap-6 mb-12">
                          {/* Total Visitantes */}
                                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                                              <div className="text-gray-400 text-sm font-medium mb-2">Total Visitantes</div>div>
                                              <div className="text-4xl font-bold text-blue-400">
                                                {metrics?.total_visitors || 0}
                                              </div>div>
                                              <p className="text-gray-500 text-xs mt-4">Visitantes únicos registrados</p>p>
                                  </div>div>
                        
                          {/* Total Páginas Vistas */}
                                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                                              <div className="text-gray-400 text-sm font-medium mb-2">Total Páginas Vistas</div>div>
                                              <div className="text-4xl font-bold text-green-400">
                                                {metrics?.total_pageviews || 0}
                                              </div>div>
                                              <p className="text-gray-500 text-xs mt-4">Eventos page_view capturados</p>p>
                                  </div>div>
                        
                          {/* Total WhatsApp Clicks */}
                                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                                              <div className="text-gray-400 text-sm font-medium mb-2">Total WhatsApp Clicks</div>div>
                                              <div className="text-4xl font-bold text-green-500">
                                                {metrics?.total_whatsapp_clicks || 0}
                                              </div>div>
                                              <p className="text-gray-500 text-xs mt-4">Clics en WhatsApp detectados</p>p>
                                  </div>div>
                        </div>div>
                
                  {/* Recent Events Table */}
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                                  <h2 className="text-xl font-bold mb-4">Eventos Recientes (Últimos 50)</h2>h2>
                                  
                          {metrics?.recent_events && metrics.recent_events.length > 0 ? (
                        <div className="overflow-x-auto">
                                      <table className="w-full text-sm">
                                                      <thead>
                                                                        <tr className="border-b border-gray-700">
                                                                                            <th className="text-left py-2 px-3 font-medium text-gray-300">Tipo</th>th>
                                                                                            <th className="text-left py-2 px-3 font-medium text-gray-300">Página</th>th>
                                                                                            <th className="text-left py-2 px-3 font-medium text-gray-300">Contexto</th>th>
                                                                                            <th className="text-left py-2 px-3 font-medium text-gray-300">Dispositivo</th>th>
                                                                                            <th className="text-left py-2 px-3 font-medium text-gray-300">Hora</th>th>
                                                                        </tr>tr>
                                                      </thead>thead>
                                                      <tbody>
                                                        {metrics.recent_events.map((event, idx) => (
                                              <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/30">
                                                                    <td className="py-2 px-3">
                                                                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                                          event.event_type === 'page_view'
                                                                            ? 'bg-blue-900/50 text-blue-300'
                                                                            : 'bg-green-900/50 text-green-300'
                                              }`}>
                                                                                              {event.event_type === 'page_view' ? 'Página' : 'WhatsApp'}
                                                                                              </span>span>
                                                                    </td>td>
                                                                    <td className="py-2 px-3 text-gray-300">
                                                                      {event.page_path || event.page_title || '-'}
                                                                    </td>td>
                                                                    <td className="py-2 px-3 text-gray-300">
                                                                      {event.context || '-'}
                                                                    </td>td>
                                                                    <td className="py-2 px-3 text-gray-300 text-xs">
                                                                      {event.device_type2 || '-'}
                                                                    </td>td>
                                                                    <td className="py-2 px-3 text-gray-400 text-xs">
                                                                      {event.created_at 
                                                                                                  ? new Date(event.created_at).toLocaleTimeString()
                                                                                                  : '-'
                                                                      }
                                                                    </td>td>
                                              </tr>tr>
                                            ))}
                                                      </tbody>tbody>
                                      </table>table>
                        </div>div>
                      ) : (
                        <p className="text-gray-400 text-center py-8">No hay eventos registrados aún</p>p>
                                  )}
                        </div>div>
                
                  {/* Footer */}
                        <div className="mt-12 pt-6 border-t border-gray-700 text-gray-500 text-xs">
                                  <p>Sprint 0 CRM - Dashboard temporal para demostrar captura de datos reales</p>p>
                                  <p className="mt-2">Datos actualizados automáticamente cada 30 segundos</p>p>
                        </div>div>
                </div>div>
          </div>div>
        );
}</div>
