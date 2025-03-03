import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Filter, 
  Plus, 
  Search, 
  Tag, 
  User,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Calendar,
  FileText,
  MoreVertical,
  X,
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  projectId?: string;
  projectName?: string;
  documentId?: string;
  documentName?: string;
  commentCount: number;
  dueDate?: Date;
}

export const TicketSystem: React.FC = () => {
  // State
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Ticket['status'] | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Ticket['priority'] | 'all'>('all');
  const [sortField, setSortField] = useState<'createdAt' | 'updatedAt' | 'priority'>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  // Mock data for users
  const users = [
    {
      id: 'user1',
      name: 'Jean Martin',
      role: 'Client',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'user2',
      name: 'Marie Dupont',
      role: 'Préventionniste',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'user3',
      name: 'Pierre Durand',
      role: 'Préventionniste',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'user4',
      name: 'Sophie Bernard',
      role: 'Sous-traitant',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];
  
  // Mock data for ticket comments
  const [comments, setComments] = useState<{
    id: string;
    ticketId: string;
    content: string;
    createdBy: {
      id: string;
      name: string;
      avatar?: string;
    };
    createdAt: Date;
    attachments?: {
      id: string;
      name: string;
      type: string;
      url: string;
      size: number;
    }[];
  }[]>([
    {
      id: 'comment1',
      ticketId: 'ticket1',
      content: 'J\'ai vérifié les plans et effectivement, l\'issue de secours ne respecte pas la réglementation. Je vais préparer une proposition de modification.',
      createdBy: users[1],
      createdAt: new Date('2025-05-11T14:30:00')
    },
    {
      id: 'comment2',
      ticketId: 'ticket1',
      content: 'Voici la proposition de modification pour l\'issue de secours. Merci de me faire part de vos remarques.',
      createdBy: users[1],
      createdAt: new Date('2025-05-11T16:45:00'),
      attachments: [
        {
          id: 'att1',
          name: 'Proposition_modification_issue_secours.pdf',
          type: 'application/pdf',
          url: '#',
          size: 2450000
        }
      ]
    },
    {
      id: 'comment3',
      ticketId: 'ticket1',
      content: 'Merci pour la proposition. Pourriez-vous préciser le coût estimé de ces modifications ?',
      createdBy: users[0],
      createdAt: new Date('2025-05-12T09:15:00')
    }
  ]);
  
  // Initialize with mock data
  React.useEffect(() => {
    const mockTickets: Ticket[] = [
      {
        id: 'ticket1',
        title: 'Issue de secours non conforme - Restaurant Le Gourmet',
        description: 'L\'issue de secours du sous-sol ne respecte pas la largeur minimale requise par la réglementation ERP type N.',
        status: 'in_progress',
        priority: 'high',
        category: 'Sécurité incendie',
        createdBy: users[0],
        assignedTo: users[1],
        createdAt: new Date('2025-05-10T11:30:00'),
        updatedAt: new Date('2025-05-12T09:15:00'),
        projectId: 'proj1',
        projectName: 'Audit de sécurité - Restaurant Le Gourmet',
        documentId: 'doc1',
        documentName: 'Rapport d\'audit préliminaire',
        commentCount: 3,
        dueDate: new Date('2025-05-20T23:59:59')
      },
      {
        id: 'ticket2',
        title: 'Demande de dérogation accessibilité - Boutique Mode & Style',
        description: 'Nous souhaitons demander une dérogation pour la rampe d\'accès principale en raison de contraintes techniques liées au bâtiment historique.',
        status: 'open',
        priority: 'medium',
        category: 'Accessibilité',
        createdBy: users[0],
        createdAt: new Date('2025-05-09T15:45:00'),
        updatedAt: new Date('2025-05-09T15:45:00'),
        projectId: 'proj2',
        projectName: 'Mise en conformité accessibilité - Boutique Mode & Style',
        commentCount: 0
      },
      {
        id: 'ticket3',
        title: 'Problème d\'affichage des plans - Hôtel Bellevue',
        description: 'Je n\'arrive pas à visualiser correctement les plans d\'évacuation dans le visualiseur de documents.',
        status: 'resolved',
        priority: 'low',
        category: 'Technique',
        createdBy: users[0],
        assignedTo: users[2],
        createdAt: new Date('2025-05-08T10:20:00'),
        updatedAt: new Date('2025-05-10T14:30:00'),
        projectId: 'proj3',
        projectName: 'Suivi annuel - Hôtel Bellevue',
        documentId: 'doc3',
        documentName: 'Plans d\'évacuation',
        commentCount: 2
      },
      {
        id: 'ticket4',
        title: 'Question sur le système de désenfumage - Salle de spectacle Nova',
        description: 'Pourriez-vous préciser les exigences réglementaires concernant le système de désenfumage pour une salle de spectacle de 300 places ?',
        status: 'open',
        priority: 'urgent',
        category: 'Réglementation',
        createdBy: users[0],
        createdAt: new Date('2025-05-12T08:30:00'),
        updatedAt: new Date('2025-05-12T08:30:00'),
        projectId: 'proj4',
        projectName: 'Instruction dossier ERP - Salle de spectacle Nova',
        commentCount: 0,
        dueDate: new Date('2025-05-15T23:59:59')
      }
    ];
    
    setTickets(mockTickets);
    setFilteredTickets(mockTickets);
  }, []);
  
  // Filter and sort tickets
  React.useEffect(() => {
    let filtered = [...tickets];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query) ||
        ticket.category.toLowerCase().includes(query) ||
        (ticket.projectName && ticket.projectName.toLowerCase().includes(query))
      );
    }
    
    // Sort tickets
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'updatedAt':
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
          break;
        case 'priority':
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredTickets(filtered);
  }, [tickets, statusFilter, priorityFilter, searchQuery, sortField, sortDirection]);
  
  // Handle sort change
  const handleSort = (field: 'createdAt' | 'updatedAt' | 'priority') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Handle ticket selection
  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowTicketDetails(true);
  };
  
  // Handle adding a comment
  const handleAddComment = () => {
    if (!selectedTicket || !newComment.trim()) return;
    
    const newCommentObj = {
      id: `comment${comments.length + 1}`,
      ticketId: selectedTicket.id,
      content: newComment,
      createdBy: users[0], // Current user
      createdAt: new Date()
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
    
    // Update ticket comment count and last update time
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === selectedTicket.id 
          ? { 
              ...ticket, 
              commentCount: ticket.commentCount + 1,
              updatedAt: new Date()
            } 
          : ticket
      )
    );
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, 'dd MMM yyyy', { locale: fr });
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return format(date, 'HH:mm', { locale: fr });
  };
  
  // Format date and time for display
  const formatDateTime = (date: Date) => {
    return format(date, 'dd MMM yyyy à HH:mm', { locale: fr });
  };
  
  // Get status badge color
  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status text in French
  const getStatusText = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'in_progress':
        return 'En cours';
      case 'resolved':
        return 'Résolu';
      case 'closed':
        return 'Fermé';
      default:
        return status;
    }
  };
  
  // Get priority badge color
  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get priority text in French
  const getPriorityText = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low':
        return 'Faible';
      case 'medium':
        return 'Moyenne';
      case 'high':
        return 'Haute';
      case 'urgent':
        return 'Urgente';
      default:
        return priority;
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="h-[700px] flex flex-col md:flex-row">
        {/* Ticket list */}
        <div className={`w-full md:w-2/3 ${showTicketDetails ? 'hidden md:block' : 'block'}`}>
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-medium text-gray-900">Tickets</h2>
              <button className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau ticket
              </button>
            </div>
            
            {/* Search and filters */}
            <div className="mt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un ticket..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Ticket['status'] | 'all')}
                  className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="open">Ouvert</option>
                  <option value="in_progress">En cours</option>
                  <option value="resolved">Résolu</option>
                  <option value="closed">Fermé</option>
                </select>
                
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as Ticket['priority'] | 'all')}
                  className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="all">Toutes les priorités</option>
                  <option value="urgent">Urgente</option>
                  <option value="high">Haute</option>
                  <option value="medium">Moyenne</option>
                  <option value="low">Faible</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Ticket list */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(700px - 140px)' }}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ticket
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('priority')}
                  >
                    <div className="flex items-center">
                      Priorité
                      {sortField === 'priority' && (
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
                    Statut
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr 
                    key={ticket.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectTicket(ticket)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-blue-600">{ticket.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {ticket.projectName && (
                            <span className="inline-flex items-center">
                              <FileText className="h-3 w-3 mr-1" />
                              {ticket.projectName}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityText(ticket.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span>{formatDate(ticket.updatedAt)}</span>
                        <span className="text-xs">{formatTime(ticket.updatedAt)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-10 w-10 text-gray-300 mb-2" />
                        <p>Aucun ticket trouvé</p>
                        <p className="text-sm">Essayez de modifier vos filtres ou votre recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Ticket details */}
        <div className={`w-full md:w-1/3 border-l border-gray-200 ${showTicketDetails ? 'block' : 'hidden md:block'}`}>
          {selectedTicket ? (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Détails du ticket</h2>
                  <div className="flex space-x-2">
                    <button
                      className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowTicketDetails(false)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Ticket info */}
              <div className="p-4 overflow-y-auto flex-1">
                <div className="space-y-6">
                  {/* Title and status */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedTicket.title}</h3>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                        {getStatusText(selectedTicket.status)}
                      </span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                        {getPriorityText(selectedTicket.priority)}
                      </span>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {selectedTicket.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Metadata */}
                  <div className="bg-gray-50 rounded-md p-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-gray-500">Créé par</p>
                        <p className="font-medium">{selectedTicket.createdBy.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date de création</p>
                        <p className="font-medium">{formatDateTime(selectedTicket.createdAt)}</p>
                      </div>
                      {selectedTicket.assignedTo && (
                        <div>
                          <p className="text-gray-500">Assigné à</p>
                          <p className="font-medium">{selectedTicket.assignedTo.name}</p>
                        </div>
                      )}
                      {selectedTicket.dueDate && (
                        <div>
                          <p className="text-gray-500">Échéance</p>
                          <p className="font-medium">{formatDate(selectedTicket.dueDate)}</p>
                        </div>
                      )}
                      {selectedTicket.projectName && (
                        <div className="col-span-2">
                          <p className="text-gray-500">Projet</p>
                          <p className="font-medium">{selectedTicket.projectName}</p>
                        </div>
                      )}
                      {selectedTicket.documentName && (
                        <div className="col-span-2">
                          <p className="text-gray-500">Document associé</p>
                          <p className="font-medium">{selectedTicket.documentName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Description</h4>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>{selectedTicket.description}</p>
                    </div>
                  </div>
                  
                  {/* Comments */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Commentaires ({selectedTicket.commentCount})</h4>
                    <div className="mt-2 space-y-4">
                      {comments
                        .filter(comment => comment.ticketId === selectedTicket.id)
                        .map(comment => (
                          <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {comment.createdBy.avatar ? (
                                  <img 
                                    className="h-8 w-8 rounded-full" 
                                    src={comment.createdBy.avatar} 
                                    alt={comment.createdBy.name} 
                                  />
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                    <User className="h-5 w-5 text-gray-600" />
                                  </div>
                                )}
                                <span className="ml-2 text-sm font-medium text-gray-900">{comment.createdBy.name}</span>
                              </div>
                              <span className="text-xs text-gray-500">{formatDateTime(comment.createdAt)}</span>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">
                              <p>{comment.content}</p>
                            </div>
                            
                            {/* Attachments */}
                            {comment.attachments && comment.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {comment.attachments.map(attachment => (
                                  <div 
                                    key={attachment.id}
                                    className="bg-white rounded p-2 flex items-center border border-gray-200"
                                  >
                                    <div className="p-2 rounded bg-gray-100">
                                      <FileText className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                                      <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                                    </div>
                                    <button className="ml-auto p-1 text-gray-500 hover:text-gray-700">
                                      <Download className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  {/* Add comment */}
                  <div>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Ajouter un commentaire..."
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      rows={3}
                    />
                    <div className="mt-2 flex justify-between items-center">
                      <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          newComment.trim() 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun ticket sélectionné</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Sélectionnez un ticket pour voir les détails.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};