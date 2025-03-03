import React, { useState } from 'react';
import { 
  FileText, 
  FileCheck, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit2, 
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Calendar
} from 'lucide-react';
import { DocumentStatus, DocumentType } from '../types';

interface Document {
  id: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  fileType: string;
  fileSize: number;
  projectId: string;
  projectName: string;
  approvedBy?: string;
  approvedAt?: Date;
  dueDate?: Date;
}

export const DocumentList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'updatedAt' | 'status'>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<DocumentType | 'all'>('all');
  
  // Mock data for documents
  const documents: Document[] = [
    {
      id: '1',
      name: 'Rapport d\'audit préliminaire - Restaurant Le Gourmet',
      type: DocumentType.REPORT,
      status: DocumentStatus.PENDING_REVIEW,
      version: 1.0,
      createdAt: new Date('2025-05-05T10:00:00'),
      updatedAt: new Date('2025-05-10T14:30:00'),
      createdBy: 'Pierre Durand',
      fileType: 'pdf',
      fileSize: 2540000,
      projectId: '1',
      projectName: 'Audit de sécurité - Restaurant Le Gourmet',
      dueDate: new Date('2025-05-20T23:59:59')
    },
    {
      id: '2',
      name: 'Plan d\'évacuation - Restaurant Le Gourmet',
      type: DocumentType.PLAN,
      status: DocumentStatus.PENDING_REVIEW,
      version: 1.2,
      createdAt: new Date('2025-05-06T11:15:00'),
      updatedAt: new Date('2025-05-11T09:45:00'),
      createdBy: 'Sophie Bernard',
      fileType: 'dwg',
      fileSize: 4250000,
      projectId: '1',
      projectName: 'Audit de sécurité - Restaurant Le Gourmet',
      dueDate: new Date('2025-05-18T23:59:59')
    },
    {
      id: '3',
      name: 'Diagnostic accessibilité - Boutique Mode & Style',
      type: DocumentType.REPORT,
      status: DocumentStatus.APPROVED,
      version: 2.0,
      createdAt: new Date('2025-04-20T09:30:00'),
      updatedAt: new Date('2025-05-02T16:20:00'),
      createdBy: 'Marie Dupont',
      fileType: 'pdf',
      fileSize: 3120000,
      projectId: '2',
      projectName: 'Mise en conformité accessibilité - Boutique Mode & Style',
      approvedBy: 'Jean Martin',
      approvedAt: new Date('2025-05-05T10:15:00')
    },
    {
      id: '4',
      name: 'Plan de mise en conformité - Boutique Mode & Style',
      type: DocumentType.PLAN,
      status: DocumentStatus.PENDING_REVIEW,
      version: 1.1,
      createdAt: new Date('2025-05-01T14:00:00'),
      updatedAt: new Date('2025-05-12T11:30:00'),
      createdBy: 'Marie Dupont',
      fileType: 'dwg',
      fileSize: 5100000,
      projectId: '2',
      projectName: 'Mise en conformité accessibilité - Boutique Mode & Style',
      dueDate: new Date('2025-05-15T23:59:59')
    },
    {
      id: '5',
      name: 'Rapport annuel de sécurité - Hôtel Bellevue',
      type: DocumentType.REPORT,
      status: DocumentStatus.APPROVED,
      version: 1.0,
      createdAt: new Date('2025-04-10T08:45:00'),
      updatedAt: new Date('2025-04-15T13:20:00'),
      createdBy: 'Pierre Durand',
      fileType: 'pdf',
      fileSize: 1850000,
      projectId: '3',
      projectName: 'Suivi annuel - Hôtel Bellevue',
      approvedBy: 'Sophie Bernard',
      approvedAt: new Date('2025-04-18T09:30:00')
    },
    {
      id: '6',
      name: 'Formulaire de vérification des équipements - Hôtel Bellevue',
      type: DocumentType.FORM,
      status: DocumentStatus.APPROVED,
      version: 1.0,
      createdAt: new Date('2025-04-12T10:30:00'),
      updatedAt: new Date('2025-04-14T15:45:00'),
      createdBy: 'Pierre Durand',
      fileType: 'pdf',
      fileSize: 950000,
      projectId: '3',
      projectName: 'Suivi annuel - Hôtel Bellevue',
      approvedBy: 'Sophie Bernard',
      approvedAt: new Date('2025-04-18T09:35:00')
    },
    {
      id: '7',
      name: 'Dossier préliminaire ERP - Salle de spectacle Nova',
      type: DocumentType.REPORT,
      status: DocumentStatus.DRAFT,
      version: 0.5,
      createdAt: new Date('2025-05-08T13:15:00'),
      updatedAt: new Date('2025-05-09T11:20:00'),
      createdBy: 'Jean Martin',
      fileType: 'pdf',
      fileSize: 3750000,
      projectId: '4',
      projectName: 'Instruction dossier ERP - Salle de spectacle Nova'
    },
    {
      id: '8',
      name: 'Plans architecturaux - Salle de spectacle Nova',
      type: DocumentType.PLAN,
      status: DocumentStatus.REJECTED,
      version: 1.0,
      createdAt: new Date('2025-05-05T09:00:00'),
      updatedAt: new Date('2025-05-07T16:40:00'),
      createdBy: 'Sophie Bernard',
      fileType: 'dwg',
      fileSize: 6200000,
      projectId: '4',
      projectName: 'Instruction dossier ERP - Salle de spectacle Nova'
    }
  ];
  
  // Filter documents based on active tab and search query
  const filteredDocuments = documents.filter(doc => {
    // Filter by tab
    if (activeTab === 'pending' && doc.status !== DocumentStatus.PENDING_REVIEW) return false;
    if (activeTab === 'approved' && doc.status !== DocumentStatus.APPROVED) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!doc.name.toLowerCase().includes(query) && 
          !doc.projectName.toLowerCase().includes(query) &&
          !doc.createdBy.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Filter by document type
    if (filterType !== 'all' && doc.type !== filterType) return false;
    
    return true;
  });
  
  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'updatedAt':
        comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Handle sort change
  const handleSort = (field: 'name' | 'updatedAt' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Format file size for display
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Get document icon based on type
  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case DocumentType.PLAN:
        return <FileText className="h-5 w-5 text-blue-500" />;
      case DocumentType.FORM:
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case DocumentType.REPORT:
        return <FileText className="h-5 w-5 text-purple-500" />;
      case DocumentType.QUOTE:
        return <FileText className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get document type text in French
  const getDocumentTypeText = (type: DocumentType) => {
    switch (type) {
      case DocumentType.PLAN:
        return 'Plan';
      case DocumentType.FORM:
        return 'Formulaire';
      case DocumentType.REPORT:
        return 'Rapport';
      case DocumentType.QUOTE:
        return 'Devis';
      case DocumentType.CONTRACT:
        return 'Contrat';
      case DocumentType.INVOICE:
        return 'Facture';
      default:
        return 'Document';
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.DRAFT:
        return 'bg-gray-200 text-gray-800';
      case DocumentStatus.PENDING_REVIEW:
        return 'bg-yellow-100 text-yellow-800';
      case DocumentStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case DocumentStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case DocumentStatus.ARCHIVED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status text in French
  const getStatusText = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.DRAFT:
        return 'Brouillon';
      case DocumentStatus.PENDING_REVIEW:
        return 'En attente';
      case DocumentStatus.APPROVED:
        return 'Approuvé';
      case DocumentStatus.REJECTED:
        return 'Rejeté';
      case DocumentStatus.ARCHIVED:
        return 'Archivé';
      default:
        return status;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.DRAFT:
        return <Edit2 className="h-4 w-4 text-gray-500" />;
      case DocumentStatus.PENDING_REVIEW:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case DocumentStatus.APPROVED:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case DocumentStatus.REJECTED:
        return <XCircle className="h-4 w-4 text-red-500" />;
      case DocumentStatus.ARCHIVED:
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FileText className="h-4 w-4 mr-2" />
              Nouveau document
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Clock className="h-4 w-4 inline mr-1" />
                En attente ({documents.filter(d => d.status === DocumentStatus.PENDING_REVIEW).length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CheckCircle className="h-4 w-4 inline mr-1" />
                Approuvés ({documents.filter(d => d.status === DocumentStatus.APPROVED).length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'all'
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tous ({documents.length})
              </button>
            </div>
            
            {/* Search and filters */}
            <div className="flex space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as DocumentType | 'all')}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="all">Tous les types</option>
                  <option value={DocumentType.PLAN}>Plans</option>
                  <option value={DocumentType.REPORT}>Rapports</option>
                  <option value={DocumentType.FORM}>Formulaires</option>
                  <option value={DocumentType.QUOTE}>Devis</option>
                  <option value={DocumentType.CONTRACT}>Contrats</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Document list */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Document
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Projet
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Statut
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('updatedAt')}
                >
                  <div className="flex items-center">
                    Dernière mise à jour
                    {sortField === 'updatedAt' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Échéance
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getDocumentIcon(document.type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-blue-600">{document.name}</div>
                        <div className="text-xs text-gray-500">
                          Version {document.version} • {formatFileSize(document.fileSize)} • {document.fileType.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.projectName}</div>
                    <div className="text-xs text-gray-500">Par {document.createdBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getDocumentTypeText(document.type)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(document.status)}`}>
                      {getStatusIcon(document.status)}
                      <span className="ml-1">{getStatusText(document.status)}</span>
                    </span>
                    {document.status === DocumentStatus.APPROVED && document.approvedBy && (
                      <div className="text-xs text-gray-500 mt-1">
                        Par {document.approvedBy} le {formatDate(document.approvedAt!)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(document.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {document.dueDate ? (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {formatDate(document.dueDate)}
                        {new Date() > document.dueDate && (
                          <span className="ml-1 text-red-500 text-xs">En retard</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Visualiser"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {document.status === DocumentStatus.PENDING_REVIEW && (
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Approuver"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                      {document.status === DocumentStatus.PENDING_REVIEW && (
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Rejeter"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      )}
                      {document.status !== DocumentStatus.DRAFT && (
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Télécharger"
                          disabled={document.status !== DocumentStatus.APPROVED}
                        >
                          <Download className={`h-5 w-5 ${document.status !== DocumentStatus.APPROVED ? 'opacity-50 cursor-not-allowed' : ''}`} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {sortedDocuments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-10 w-10 text-gray-300 mb-2" />
                      <p>Aucun document trouvé</p>
                      <p className="text-sm">Essayez de modifier vos filtres ou votre recherche</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};