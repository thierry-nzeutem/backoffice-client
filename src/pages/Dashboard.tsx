import React, { useState } from 'react';
import { 
  BarChart, 
  FileText, 
  Calendar, 
  Bell, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Building,
  FileCheck,
  Users
} from 'lucide-react';
import { ProjectStatus, ProjectType } from '../types';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for projects
  const projects = [
    {
      id: '1',
      title: 'Audit de sécurité - Restaurant Le Gourmet',
      description: 'Audit complet des installations de sécurité incendie',
      status: ProjectStatus.IN_PROGRESS,
      type: ProjectType.SECURITY_AUDIT,
      dueDate: new Date('2025-06-15'),
      progress: 45,
      location: 'Paris 8ème',
      buildingType: 'Restaurant (ERP type N)',
      pendingDocuments: 3,
      lastActivity: new Date('2025-05-10')
    },
    {
      id: '2',
      title: 'Mise en conformité accessibilité - Boutique Mode & Style',
      description: 'Étude et suivi de la mise en conformité accessibilité',
      status: ProjectStatus.REVIEW,
      type: ProjectType.ACCESSIBILITY_AUDIT,
      dueDate: new Date('2025-05-30'),
      progress: 80,
      location: 'Lyon Centre',
      buildingType: 'Commerce (ERP type M)',
      pendingDocuments: 1,
      lastActivity: new Date('2025-05-12')
    },
    {
      id: '3',
      title: 'Suivi annuel - Hôtel Bellevue',
      description: 'Visite annuelle de contrôle des installations de sécurité',
      status: ProjectStatus.COMPLETED,
      type: ProjectType.ANNUAL_MONITORING,
      dueDate: new Date('2025-04-20'),
      progress: 100,
      location: 'Nice',
      buildingType: 'Hôtel (ERP type O)',
      pendingDocuments: 0,
      lastActivity: new Date('2025-04-18')
    },
    {
      id: '4',
      title: 'Instruction dossier ERP - Salle de spectacle Nova',
      description: 'Préparation et suivi du dossier pour la commission de sécurité',
      status: ProjectStatus.DRAFT,
      type: ProjectType.ERP_FILE_INSTRUCTION,
      dueDate: new Date('2025-07-10'),
      progress: 15,
      location: 'Marseille',
      buildingType: 'Salle de spectacle (ERP type L)',
      pendingDocuments: 5,
      lastActivity: new Date('2025-05-05')
    }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: '1',
      title: 'Document mis à jour',
      message: 'Le rapport préliminaire pour Boutique Mode & Style a été mis à jour',
      date: new Date('2025-05-12T10:30:00'),
      read: false,
      type: 'document'
    },
    {
      id: '2',
      title: 'Nouveau message',
      message: 'Vous avez reçu un message de Marie Dupont concernant le projet Hôtel Bellevue',
      date: new Date('2025-05-11T16:45:00'),
      read: true,
      type: 'message'
    },
    {
      id: '3',
      title: 'Échéance proche',
      message: 'La date limite pour valider les documents du projet Boutique Mode & Style est dans 3 jours',
      date: new Date('2025-05-10T09:15:00'),
      read: false,
      type: 'deadline'
    }
  ];

  // Mock data for upcoming events
  const events = [
    {
      id: '1',
      title: 'Visite technique - Restaurant Le Gourmet',
      date: new Date('2025-05-20T10:00:00'),
      type: 'visit'
    },
    {
      id: '2',
      title: 'Réunion de suivi - Boutique Mode & Style',
      date: new Date('2025-05-18T14:30:00'),
      type: 'meeting'
    },
    {
      id: '3',
      title: 'Commission de sécurité - Hôtel Bellevue',
      date: new Date('2025-06-05T09:00:00'),
      type: 'commission'
    }
  ];

  // Filter projects based on active tab
  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in_progress') return project.status === ProjectStatus.IN_PROGRESS;
    if (activeTab === 'review') return project.status === ProjectStatus.REVIEW;
    if (activeTab === 'completed') return project.status === ProjectStatus.COMPLETED;
    return true;
  });

  // Format date to display in French format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format date with time
  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.DRAFT:
        return 'bg-gray-200 text-gray-800';
      case ProjectStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case ProjectStatus.REVIEW:
        return 'bg-yellow-100 text-yellow-800';
      case ProjectStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case ProjectStatus.ARCHIVED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text in French
  const getStatusText = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.DRAFT:
        return 'Brouillon';
      case ProjectStatus.IN_PROGRESS:
        return 'En cours';
      case ProjectStatus.REVIEW:
        return 'En révision';
      case ProjectStatus.COMPLETED:
        return 'Terminé';
      case ProjectStatus.ARCHIVED:
        return 'Archivé';
      default:
        return status;
    }
  };

  // Get project type text in French
  const getProjectTypeText = (type: ProjectType) => {
    switch (type) {
      case ProjectType.ANNUAL_MONITORING:
        return 'Suivi annuel';
      case ProjectType.SECURITY_AUDIT:
        return 'Audit sécurité';
      case ProjectType.ACCESSIBILITY_AUDIT:
        return 'Audit accessibilité';
      case ProjectType.ERP_FILE_INSTRUCTION:
        return 'Dossier ERP';
      case ProjectType.CSSI:
        return 'CSSI';
      case ProjectType.AMO:
        return 'AMO';
      case ProjectType.AT_FILE:
        return 'Dossier AT';
      default:
        return type;
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'deadline':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get event icon based on type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <Building className="h-5 w-5 text-purple-500" />;
      case 'meeting':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'commission':
        return <FileCheck className="h-5 w-5 text-red-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bonjour, Entreprise ABC</h1>
              <p className="mt-1 text-sm text-gray-500">
                Bienvenue sur votre tableau de bord. Voici un aperçu de vos projets et activités récentes.
              </p>
            </div>
            <div className="hidden sm:flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <FileText className="h-4 w-4 mr-2" />
                Nouveau document
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <MessageSquare className="h-4 w-4 mr-2" />
                Nouveau message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat 1 */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Projets actifs</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">4</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <span className="sr-only">Augmentation de</span>
                      +2
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Documents en attente</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">9</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <span className="sr-only">Augmentation de</span>
                      +3
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Projets terminés</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">12</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <span className="sr-only">Augmentation de</span>
                      +4
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Échéances proches</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">2</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <span className="sr-only">Diminution de</span>
                      -1
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Vos projets</h2>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Voir tous les projets
            </a>
          </div>
          <div className="mt-3">
            <div className="sm:hidden">
              <select
                id="tabs"
                name="tabs"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="all">Tous</option>
                <option value="in_progress">En cours</option>
                <option value="review">En révision</option>
                <option value="completed">Terminés</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`${
                      activeTab === 'all'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Tous
                  </button>
                  <button
                    onClick={() => setActiveTab('in_progress')}
                    className={`${
                      activeTab === 'in_progress'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    En cours
                  </button>
                  <button
                    onClick={() => setActiveTab('review')}
                    className={`${
                      activeTab === 'review'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    En révision
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`${
                      activeTab === 'completed'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Terminés
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <li key={project.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">{project.title}</p>
                        <div className={`ml-2 flex-shrink-0 flex`}>
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                            {getStatusText(project.status)}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {getProjectTypeText(project.type)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Building className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {project.buildingType}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          Échéance: {formatDate(project.dueDate)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <FileText className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          {project.pendingDocuments} document{project.pendingDocuments !== 1 ? 's' : ''} en attente
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block text-blue-600">
                              Progression: {project.progress}%
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-gray-600">
                              Dernière activité: {formatDate(project.lastActivity)}
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                          <div
                            style={{ width: `${project.progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Two-column layout for notifications and calendar */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Notifications */}
        <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Notifications récentes</h2>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Voir toutes les notifications
              </a>
            </div>
          </div>
          <div className="bg-white overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500">{formatDateTime(notification.date)}</p>
                          </div>
                          <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="ml-2 flex-shrink-0">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Calendar/Upcoming Events */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Événements à venir</h2>
          </div>
          <div className="bg-white overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {events.map((event) => (
                <li key={event.id}>
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-500">{formatDateTime(event.date)}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Voir le calendrier complet
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};