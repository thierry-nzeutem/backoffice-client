import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock,
  FileText,
  MessageSquare,
  AlertTriangle,
  X,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Notification {
  id: string;
  type: 'document' | 'message' | 'deadline' | 'project' | 'quote' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  projectId?: string;
  projectName?: string;
  documentId?: string;
  documentName?: string;
  actionUrl?: string;
  actionLabel?: string;
  priority?: 'normal' | 'high';
}

export const NotificationSystem: React.FC = () => {
  // State
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'document' | 'message' | 'deadline'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  // Initialize with mock data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 'notif1',
        type: 'document',
        title: 'Nouveau document',
        message: 'Le rapport préliminaire pour Restaurant Le Gourmet a été mis à jour',
        timestamp: new Date('2025-05-12T10:30:00'),
        read: false,
        projectId: 'proj1',
        projectName: 'Audit de sécurité - Restaurant Le Gourmet',
        documentId: 'doc1',
        documentName: 'Rapport préliminaire',
        actionUrl: '#',
        actionLabel: 'Voir le document'
      },
      {
        id: 'notif2',
        type: 'message',
        title: 'Nouveau message',
        message: 'Marie Dupont vous a envoyé un message concernant le projet Hôtel Bellevue',
        timestamp: new Date('2025-05-11T16:45:00'),
        read: true,
        projectId: 'proj3',
        projectName: 'Suivi annuel - Hôtel Bellevue',
        actionUrl: '#',
        actionLabel: 'Répondre'
      },
      {
        id: 'notif3',
        type: 'deadline',
        title: 'Échéance proche',
        message: 'La date limite pour valider les documents du projet Boutique Mode & Style est dans 3 jours',
        timestamp: new Date('2025-05-10T09:15:00'),
        read: false,
        projectId: 'proj2',
        projectName: 'Mise en conformité accessibilité - Boutique Mode & Style',
        priority: 'high',
        actionUrl: '#',
        actionLabel: 'Voir les documents'
      },
      {
        id: 'notif4',
        type: 'project',
        title: 'Statut du projet mis à jour',
        message: 'Le projet Restaurant Le Gourmet est maintenant en phase de révision',
        timestamp: new Date('2025-05-09T14:20:00'),
        read: true,
        projectId: 'proj1',
        projectName: 'Audit de sécurité - Restaurant Le Gourmet'
      },
      {
        id: 'notif5',
        type: 'quote',
        title: 'Devis disponible',
        message: 'Un nouveau devis pour les travaux de mise en conformité est disponible',
        timestamp: new Date('2025-05-08T11:30:00'),
        read: false,
        projectId: 'proj2',
        projectName: 'Mise en conformité accessibilité - Boutique Mode & Style',
        actionUrl: '#',
        actionLabel: 'Voir le devis'
      },
      {
        id: 'notif6',
        type: 'system',
        title: 'Maintenance planifiée',
        message: 'La plateforme sera indisponible pour maintenance le 20/05/2025 de 2h à 4h du matin',
        timestamp: new Date('2025-05-07T10:00:00'),
        read: true
      },
      {
        id: 'notif7',
        type: 'document',
        title: 'Document approuvé',
        message: 'Le plan d\'évacuation pour Hôtel Bellevue a été approuvé',
        timestamp: new Date('2025-05-06T15:45:00'),
        read: true,
        projectId: 'proj3',
        projectName: 'Suivi annuel - Hôtel Bellevue',
        documentId: 'doc3',
        documentName: 'Plan d\'évacuation',
        actionUrl: '#',
        actionLabel: 'Télécharger'
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);
  
  // Toggle notification panel
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };
  
  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    
    // Update unread count
    setUnreadCount(prevCount => Math.max(0, prevCount - 1));
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    setUnreadCount(0);
  };
  
  // Delete notification
  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    
    // Update unread count if the deleted notification was unread
    if (notification && !notification.read) {
      setUnreadCount(prevCount => Math.max(0, prevCount - 1));
    }
  };
  
  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });
  
  // Sort notifications
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const comparison = a.timestamp.getTime() - b.timestamp.getTime();
    return sortOrder === 'newest' ? -comparison : comparison;
  });
  
  // Format date for display
  const formatNotificationDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date >= today) {
      return 'Aujourd\'hui ' + format(date, 'HH:mm', { locale: fr });
    } else if (date >= yesterday) {
      return 'Hier ' + format(date, 'HH:mm', { locale: fr });
    } else {
      return format(date, 'dd/MM/yyyy HH:mm', { locale: fr });
    }
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'deadline':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'project':
        return <CheckCircle className="h-5 w-5 text-purple-500" />;
      case 'quote':
        return <FileText className="h-5 w-5 text-orange-500" />;
      case 'system':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="relative">
      {/* Notification button */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span className="sr-only">Notifications</span>
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {/* Notification panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <div className="flex space-x-2">
              <button
                onClick={markAllAsRead}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                title="Marquer tout comme lu"
              >
                <CheckCircle className="h-5 w-5" />
              </button>
              <button
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                title="Paramètres de notification"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={toggleNotifications}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                title="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div>
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(
                    e.target.value as
                      | 'all'
                      | 'unread'
                      | 'document'
                      | 'message'
                      | 'deadline'
                  )
                }
                className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="all">Tous</option>
                <option value="unread">Non lus</option>
                <option value="document">Documents</option>
                <option value="message">Messages</option>
                <option value="deadline">Échéances</option>
              </select>
            </div>
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              {sortOrder === 'newest' ? (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Plus récent
                </>
              ) : (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Plus ancien
                </>
              )}
            </button>
          </div>
          
          {/* Notification list */}
          <div className="max-h-96 overflow-y-auto">
            {sortedNotifications.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {sortedNotifications.map(notification => (
                  <li 
                    key={notification.id}
                    className={`hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="px-4 py-4 sm:px-6 relative">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                              {notification.title}
                              {notification.priority === 'high' && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                  Urgent
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500">{formatNotificationDate(notification.timestamp)}</p>
                          </div>
                          <p className={`mt-1 text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                            {notification.message}
                          </p>
                          {notification.projectName && (
                            <p className="mt-1 text-xs text-gray-500">
                              {notification.projectName}
                            </p>
                          )}
                          {notification.actionUrl && (
                            <div className="mt-2">
                              <a
                                href={notification.actionUrl}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.actionLabel}
                              </a>
                            </div>
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="ml-2 flex-shrink-0 flex">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
                              title="Marquer comme lu"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 rounded-full text-gray-400 hover:text-gray-500"
                            title="Supprimer"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center">
                <Bell className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-2 text-sm text-gray-500">Aucune notification</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Voir toutes les notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};