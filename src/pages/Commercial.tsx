import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  FileText, 
  Users, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Edit, 
  Clock, 
  CheckCircle, 
  XCircle, 
  User, 
  Briefcase, 
  Award, 
  MessageSquare, 
  ChevronLeft, 
  Plus, 
  Star, 
  StarHalf
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Types for quotes
interface Quote {
  id: string;
  projectName: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  createdAt: Date;
  expiresAt: Date;
  lastUpdatedAt: Date;
}

// Types for invoices
interface Invoice {
  id: string;
  projectName: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  createdAt: Date;
  dueDate: Date;
}

// Types for subcontractors
interface Subcontractor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string[];
  status: 'active' | 'inactive' | 'pending';
  accessLevel: 'standard' | 'specialized' | 'expert';
  rating: number;
  completedTasks: number;
  joinedAt: Date;
  avatar?: string;
}

// Types for tasks
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  subcontractorId: string;
  projectName: string;
  createdAt: Date;
  dueDate: Date;
}

// Types for evaluations
interface Evaluation {
  id: string;
  subcontractorId: string;
  taskId: string;
  taskTitle: string;
  projectName: string;
  technicalQuality: number;
  communication: number;
  timeliness: number;
  overallRating: number;
  feedback: string;
  createdBy: string;
  createdAt: Date;
}

export const Commercial: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'quotes' | 'invoices' | 'subcontractors'>('quotes');
  
  // State for quotes
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [quoteSearchQuery, setQuoteSearchQuery] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<Quote['status'] | 'all'>('all');
  const [sortField, setSortField] = useState<'amount' | 'createdAt' | 'expiresAt'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // State for invoices
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState('');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<Invoice['status'] | 'all'>('all');
  
  // State for subcontractors
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);
  const [filteredSubcontractors, setFilteredSubcontractors] = useState<Subcontractor[]>([]);
  const [subcontractorSearchQuery, setSubcontractorSearchQuery] = useState('');
  const [subcontractorStatusFilter, setSubcontractorStatusFilter] = useState<Subcontractor['status'] | 'all'>('all');
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<Subcontractor | null>(null);
  
  // State for tasks and evaluations
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subcontractorTasks, setSubcontractorTasks] = useState<Task[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [subcontractorEvaluations, setSubcontractorEvaluations] = useState<Evaluation[]>([]);
  
  // Initialize with mock data
  useEffect(() => {
    // Mock quotes
    const mockQuotes: Quote[] = [
      {
        id: 'DEV-2025-001',
        projectName: 'Audit de sécurité - Restaurant Le Gourmet',
        clientName: 'Restaurant Le Gourmet',
        amount: 3500,
        status: 'accepted',
        createdAt: new Date('2025-05-01T10:00:00'),
        expiresAt: new Date('2025-05-15T23:59:59'),
        lastUpdatedAt: new Date('2025-05-03T14:30:00')
      },
      {
        id: 'DEV-2025-002',
        projectName: 'Diagnostic accessibilité - Boutique Mode & Style',
        clientName: 'Boutique Mode & Style',
        amount: 2800,
        status: 'sent',
        createdAt: new Date('2025-05-05T11:30:00'),
        expiresAt: new Date('2025-05-20T23:59:59'),
        lastUpdatedAt: new Date('2025-05-05T11:30:00')
      },
      {
        id: 'DEV-2025-003',
        projectName: 'Suivi annuel - Hôtel Bellevue',
        clientName: 'Hôtel Bellevue',
        amount: 4200,
        status: 'draft',
        createdAt: new Date('2025-05-08T09:15:00'),
        expiresAt: new Date('2025-05-23T23:59:59'),
        lastUpdatedAt: new Date('2025-05-10T16:45:00')
      },
      {
        id: 'DEV-2025-004',
        projectName: 'Instruction dossier ERP - Salle de spectacle Nova',
        clientName: 'Salle de spectacle Nova',
        amount: 5600,
        status: 'viewed',
        createdAt: new Date('2025-05-10T14:20:00'),
        expiresAt: new Date('2025-05-25T23:59:59'),
        lastUpdatedAt: new Date('2025-05-12T10:30:00')
      },
      {
        id: 'DEV-2025-005',
        projectName: 'Mise en conformité - Clinique Saint-Joseph',
        clientName: 'Clinique Saint-Joseph',
        amount: 7800,
        status: 'rejected',
        createdAt: new Date('2025-04-25T11:00:00'),
        expiresAt: new Date('2025-05-10T23:59:59'),
        lastUpdatedAt: new Date('2025-05-05T09:45:00')
      }
    ];
    
    setQuotes(mockQuotes);
    setFilteredQuotes(mockQuotes);
    
    // Mock invoices
    const mockInvoices: Invoice[] = [
      {
        id: 'FAC-2025-001',
        projectName: 'Audit de sécurité - Restaurant Le Gourmet',
        clientName: 'Restaurant Le Gourmet',
        amount: 3500,
        status: 'paid',
        createdAt: new Date('2025-05-05T10:00:00'),
        dueDate: new Date('2025-06-05T23:59:59')
      },
      {
        id: 'FAC-2025-002',
        projectName: 'Diagnostic accessibilité - Boutique Mode & Style',
        clientName: 'Boutique Mode & Style',
        amount: 2800,
        status: 'sent',
        createdAt: new Date('2025-05-10T11:30:00'),
        dueDate: new Date('2025-06-10T23:59:59')
      },
      {
        id: 'FAC-2025-003',
        projectName: 'Suivi annuel - Hôtel Bellevue',
        clientName: 'Hôtel Bellevue',
        amount: 4200,
        status: 'draft',
        createdAt: new Date('2025-05-12T09:15:00'),
        dueDate: new Date('2025-06-12T23:59:59')
      },
      {
        id: 'FAC-2025-004',
        projectName: 'Mise en conformité - Clinique Saint-Joseph',
        clientName: 'Clinique Saint-Joseph',
        amount: 3900,
        status: 'overdue',
        createdAt: new Date('2025-04-15T14:20:00'),
        dueDate: new Date('2025-05-15T23:59:59')
      }
    ];
    
    setInvoices(mockInvoices);
    setFilteredInvoices(mockInvoices);
    
    // Mock subcontractors
    const mockSubcontractors: Subcontractor[] = [
      {
        id: 'SUB-001',
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        phone: '06 12 34 56 78',
        specialty: ['Sécurité incendie', 'Accessibilité'],
        status: 'active',
        accessLevel: 'expert',
        rating: 4.8,
        completedTasks: 42,
        joinedAt: new Date('2024-01-15'),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 'SUB-002',
        name: 'Marie Martin',
        email: 'marie.martin@example.com',
        phone: '06 23 45 67 89',
        specialty: ['Accessibilité', 'Diagnostic ERP'],
        status: 'active',
        accessLevel: 'specialized',
        rating: 4.5,
        completedTasks: 28,
        joinedAt: new Date('2024-03-10'),
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 'SUB-003',
        name: 'Pierre Lefebvre',
        email: 'pierre.lefebvre@example.com',
        phone: '06 34 56 78 90',
        specialty: ['Sécurité incendie', 'CSSI'],
        status: 'inactive',
        accessLevel: 'standard',
        rating: 3.7,
        completedTasks: 15,
        joinedAt: new Date('2024-04-05')
      },
      {
        id: 'SUB-004',
        name: 'Sophie Bernard',
        email: 'sophie.bernard@example.com',
        phone: '06 45 67 89 01',
        specialty: ['AMO', 'Accessibilité'],
        status: 'active',
        accessLevel: 'expert',
        rating: 4.9,
        completedTasks: 37,
        joinedAt: new Date('2024-02-20'),
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 'SUB-005',
        name: 'Thomas Moreau',
        email: 'thomas.moreau@example.com',
        phone: '06 56 78 90 12',
        specialty: ['Diagnostic ERP', 'Sécurité incendie'],
        status: 'pending',
        accessLevel: 'standard',
        rating: 0,
        completedTasks: 0,
        joinedAt: new Date('2025-05-01')
      }
    ];
    
    setSubcontractors(mockSubcontractors);
    setFilteredSubcontractors(mockSubcontractors);
    
    // Mock tasks
    const mockTasks: Task[] = [
      {
        id: 'TASK-001',
        title: 'Analyse des plans d\'évacuation',
        description: 'Vérifier la conformité des plans d\'évacuation du Restaurant Le Gourmet selon la réglementation ERP type N.',
        status: 'completed',
        priority: 'high',
        subcontractorId: 'SUB-001',
        projectName: 'Audit de sécurité - Restaurant Le Gourmet',
        createdAt: new Date('2025-04-20'),
        dueDate: new Date('2025-04-30')
      },
      {
        id: 'TASK-002',
        title: 'Diagnostic accessibilité sanitaires',
        description: 'Réaliser le diagnostic d\'accessibilité des sanitaires de la Boutique Mode & Style.',
        status: 'in_progress',
        priority: 'medium',
        subcontractorId: 'SUB-002',
        projectName: 'Diagnostic accessibilité - Boutique Mode & Style',
        createdAt: new Date('2025-05-05'),
        dueDate: new Date('2025-05-15')
      },
      {
        id: 'TASK-003',
        title: 'Vérification des équipements de sécurité',
        description: 'Contrôler l\'état et la conformité des équipements de sécurité incendie de l\'Hôtel Bellevue.',
        status: 'pending',
        priority: 'medium',
        subcontractorId: 'SUB-001',
        projectName: 'Suivi annuel - Hôtel Bellevue',
        createdAt: new Date('2025-05-10'),
        dueDate: new Date('2025-05-20')
      },
      {
        id: 'TASK-004',
        title: 'Élaboration du PGC',
        description: 'Rédiger le Plan Général de Coordination pour les travaux de mise en conformité de la Clinique Saint-Joseph.',
        status: 'delayed',
        priority: 'urgent',
        subcontractorId: 'SUB-003',
        projectName: 'Mise en conformité - Clinique Saint-Joseph',
        createdAt: new Date('2025-04-25'),
        dueDate: new Date('2025-05-05')
      },
      {
        id: 'TASK-005',
        title: 'Analyse de l\'accessibilité des entrées',
        description: 'Analyser l\'accessibilité des entrées principales et secondaires de la Salle de spectacle Nova.',
        status: 'completed',
        priority: 'high',
        subcontractorId: 'SUB-004',
        projectName: 'Instruction dossier ERP - Salle de spectacle Nova',
        createdAt: new Date('2025-05-01'),
        dueDate: new Date('2025-05-10')
      }
    ];
    
    setTasks(mockTasks);
    
    // Mock evaluations
    const mockEvaluations: Evaluation[] = [
      {
        id: 'EVAL-001',
        subcontractorId: 'SUB-001',
        taskId: 'TASK-001',
        taskTitle: 'Analyse des plans d\'évacuation',
        projectName: 'Audit de sécurité - Restaurant Le Gourmet',
        technicalQuality: 5,
        communication: 4,
        timeliness: 5,
        overallRating: 4.7,
        feedback: 'Excellent travail d\'analyse. Les recommandations sont pertinentes et bien documentées.',
        createdBy: 'Marie Dupont',
        createdAt: new Date('2025-05-02')
      },
      {
        id: 'EVAL-002',
        subcontractorId: 'SUB-004',
        taskId: 'TASK-005',
        taskTitle: 'Analyse de l\'accessibilité des entrées',
        projectName: 'Instruction dossier ERP - Salle de spectacle Nova',
        technicalQuality: 5,
        communication: 5,
        timeliness: 5,
        overallRating: 5.0,
        feedback: 'Travail remarquable, avec une attention particulière aux détails. Les solutions proposées sont innovantes et parfaitement adaptées au contexte.',
        createdBy: 'Pierre Durand',
        createdAt: new Date('2025-05-12')
      }
    ];
    
    setEvaluations(mockEvaluations);
  }, []);
  
  // Filter quotes based on search query and status filter
  useEffect(() => {
    let filtered = [...quotes];
    
    // Apply status filter
    if (quoteStatusFilter !== 'all') {
      filtered = filtered.filter(quote => quote.status === quoteStatusFilter);
    }
    
    // Apply search filter
    if (quoteSearchQuery) {
      const query = quoteSearchQuery.toLowerCase();
      filtered = filtered.filter(quote => 
        quote.projectName.toLowerCase().includes(query) ||
        quote.clientName.toLowerCase().includes(query) ||
        quote.id.toLowerCase().includes(query)
      );
    }
    
    // Sort quotes
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'expiresAt':
          comparison = a.expiresAt.getTime() - b.expiresAt.getTime();
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredQuotes(filtered);
  }, [quotes, quoteStatusFilter, quoteSearchQuery, sortField, sortDirection]);
  
  // Filter invoices based on search query and status filter
  useEffect(() => {
    let filtered = [...invoices];
    
    // Apply status filter
    if (invoiceStatusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === invoiceStatusFilter);
    }
    
    // Apply search filter
    if (invoiceSearchQuery) {
      const query = invoiceSearchQuery.toLowerCase();
      filtered = filtered.filter(invoice => 
        invoice.projectName.toLowerCase().includes(query) ||
        invoice.clientName.toLowerCase().includes(query) ||
        invoice.id.toLowerCase().includes(query)
      );
    }
    
    setFilteredInvoices(filtered);
  }, [invoices, invoiceStatusFilter, invoiceSearchQuery]);
  
  // Filter subcontractors based on search query and status filter
  useEffect(() => {
    let filtered = [...subcontractors];
    
    // Apply status filter
    if (subcontractorStatusFilter !== 'all') {
      filtered = filtered.filter(subcontractor => subcontractor.status === subcontractorStatusFilter);
    }
    
    // Apply search filter
    if (subcontractorSearchQuery) {
      const query = subcontractorSearchQuery.toLowerCase();
      filtered = filtered.filter(subcontractor => 
        subcontractor.name.toLowerCase().includes(query) ||
        subcontractor.email.toLowerCase().includes(query) ||
        subcontractor.specialty.some(s => s.toLowerCase().includes(query))
      );
    }
    
    setFilteredSubcontractors(filtered);
  }, [subcontractors, subcontractorStatusFilter, subcontractorSearchQuery]);
  
  // Update subcontractor tasks and evaluations when a subcontractor is selected
  useEffect(() => {
    if (selectedSubcontractor) {
      const filteredTasks = tasks.filter(task => task.subcontractorId === selectedSubcontractor.id);
      setSubcontractorTasks(filteredTasks);
      
      const filteredEvaluations = evaluations.filter(evaluation => evaluation.subcontractorId === selectedSubcontractor.id);
      setSubcontractorEvaluations(filteredEvaluations);
    }
  }, [selectedSubcontractor, tasks, evaluations]);
  
  // Handle sort change
  const handleSort = (field: 'amount' | 'createdAt' | 'expiresAt') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, 'dd/MM/yyyy', { locale: fr });
  };
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  // Get quote status color
  const getQuoteStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'viewed':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get quote status text in French
  const getQuoteStatusText = (status: Quote['status']) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'sent':
        return 'Envoyé';
      case 'viewed':
        return 'Consulté';
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      case 'expired':
        return 'Expiré';
      default:
        return status;
    }
  };
  
  // Get invoice status color
  const getInvoiceStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get invoice status text in French
  const getInvoiceStatusText = (status: Invoice['status']) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'sent':
        return 'Envoyée';
      case 'paid':
        return 'Payée';
      case 'overdue':
        return 'En retard';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };
  
  // Get subcontractor status color
  const getSubcontractorStatusColor = (status: Subcontractor['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get subcontractor status text in French
  const getSubcontractorStatusText = (status: Subcontractor['status']) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };
  
  // Get access level color
  const getAccessLevelColor = (level: Subcontractor['accessLevel']) => {
    switch (level) {
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      case 'specialized':
        return 'bg-purple-100 text-purple-800';
      case 'expert':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get access level text in French
  const getAccessLevelText = (level: Subcontractor['accessLevel']) => {
    switch (level) {
      case 'standard':
        return 'Standard';
      case 'specialized':
        return 'Spécialisé';
      case 'expert':
        return 'Expert';
      default:
        return level;
    }
  };
  
  // Get task status color
  const getTaskStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get task status text in French
  const getTaskStatusText = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'À faire';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      case 'delayed':
        return 'En retard';
      default:
        return status;
    }
  };
  
  // Render star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <StarHalf className="h-4 w-4 text-yellow-400 fill-current" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion Commerciale</h1>
              <p className="mt-1 text-sm text-gray-500">
                Gérez vos devis, factures et sous-traitants.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau devis
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`${
                activeTab === 'quotes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <DollarSign className="h-5 w-5 mx-auto mb-1" />
              <span>Devis</span>
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`${
                activeTab === 'invoices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <FileText className="h-5 w-5 mx-auto mb-1" />
              <span>Factures</span>
            </button>
            <button
              onClick={() => setActiveTab('subcontractors')}
              className={`${
                activeTab === 'subcontractors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <Users className="h-5 w-5 mx-auto mb-1" />
              <span>Sous-traitants</span>
            </button>
          </nav>
        </div>
        
        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div>
            {/* Filters */}
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex space-x-4">
                  <select
                    value={quoteStatusFilter}
                    onChange={(e) => setQuoteStatusFilter(e.target.value as Quote['status'] | 'all')}
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="draft">Brouillons</option>
                    <option value="sent">Envoyés</option>
                    <option value="viewed">Consultés</option>
                    <option value="accepted">Acceptés</option>
                    <option value="rejected">Refusés</option>
                    <option value="expired">Expirés</option>
                  </select>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={quoteSearchQuery}
                    onChange={(e) => setQuoteSearchQuery(e.target.value)}
                    placeholder="Rechercher un devis..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Quotes list */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Référence
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Projet / Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center">
                        Montant
                        {sortField === 'amount' && (
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
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center">
                        Date d'émission
                        {sortField === 'createdAt' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="h-4 w-4 ml-1" /> : 
                            <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('expiresAt')}
                    >
                      <div className="flex items-center">
                        Expiration
                        {sortField === 'expiresAt' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="h-4 w-4 ml-1" /> : 
                            <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
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
                  {filteredQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {quote.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{quote.projectName}</div>
                        <div className="text-sm text-gray-500">{quote.clientName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(quote.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getQuoteStatusColor(quote.status)}`}>
                          {getQuoteStatusText(quote.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(quote.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(quote.expiresAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            title="Voir"
                          >
                            <FileText className="h-5 w-5" />
                          </button>
                          {quote.status === 'draft' && (
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              title="Modifier"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="Télécharger"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredQuotes.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <DollarSign className="h-10 w-10 text-gray-300 mb-2" />
                          <p>Aucun devis trouvé</p>
                          <p className="text-sm">Essayez de modifier vos filtres ou votre recherche</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div>
            {/* Filters */}
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex space-x-4">
                  <select
                    value={invoiceStatusFilter}
                    onChange={(e) => setInvoiceStatusFilter(e.target.value as Invoice['status'] | 'all')}
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="draft">Brouillons</option>
                    <option value="sent">Envoyées</option>
                    <option value="paid">Payées</option>
                    <option value="overdue">En retard</option>
                    <option value="cancelled">Annulées</option>
                  </select>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={invoiceSearchQuery}
                    onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                    placeholder="Rechercher une facture..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Invoices list */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Référence
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Projet / Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Montant
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
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center">
                        Date d'émission
                        {sortField === 'createdAt' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="h-4 w-4 ml-1" /> : 
                            <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('dueDate')}
                    >
                      <div className="flex items-center">
                        Échéance
                        {sortField === 'dueDate' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="h-4 w-4 ml-1" /> : 
                            <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
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
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{invoice.projectName}</div>
                        <div className="text-sm text-gray-500">{invoice.clientName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded- full ${getInvoiceStatusColor(invoice.status)}`}>
                          {getInvoiceStatusText(invoice.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(invoice.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(invoice.dueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            title="Voir"
                          >
                            <FileText className="h-5 w-5" />
                          </button>
                          {invoice.status === 'draft' && (
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              title="Modifier"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="Télécharger"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredInvoices.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <DollarSign className="h-10 w-10 text-gray-300 mb-2" />
                          <p>Aucune facture trouvée</p>
                          <p className="text-sm">Essayez de modifier vos filtres ou votre recherche</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Subcontractors Tab */}
        {activeTab === 'subcontractors' && (
          <div className="flex flex-col lg:flex-row">
            {/* Subcontractors list */}
            <div className={`w-full lg:w-1/2 ${selectedSubcontractor ? 'hidden lg:block' : 'block'}`}>
              {/* Filters */}
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex space-x-4">
                    <select
                      value={subcontractorStatusFilter}
                      onChange={(e) => setSubcontractorStatusFilter(e.target.value as Subcontractor['status'] | 'all')}
                      className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="active">Actifs</option>
                      <option value="inactive">Inactifs</option>
                      <option value="pending">En attente</option>
                    </select>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={subcontractorSearchQuery}
                      onChange={(e) => setSubcontractorSearchQuery(e.target.value)}
                      placeholder="Rechercher un sous-traitant..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Subcontractors list */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(700px - 140px)' }}>
                <ul className="divide-y divide-gray-200">
                  {filteredSubcontractors.map((subcontractor) => (
                    <li 
                      key={subcontractor.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedSubcontractor(subcontractor)}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {subcontractor.avatar ? (
                                <img 
                                  className="h-10 w-10 rounded-full" 
                                  src={subcontractor.avatar} 
                                  alt={subcontractor.name} 
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <User className="h-6 w-6 text-gray-600" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-blue-600">{subcontractor.name}</div>
                                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccessLevelColor(subcontractor.accessLevel)}`}>
                                  {getAccessLevelText(subcontractor.accessLevel)}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500">
                                {subcontractor.specialty.join(', ')}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubcontractorStatusColor(subcontractor.status)}`}>
                              {getSubcontractorStatusText(subcontractor.status)}
                            </span>
                            <div className="mt-1">
                              {renderRating(subcontractor.rating)}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {subcontractor.completedTasks} tâches complétées
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <p>
                              Actif depuis {formatDate(subcontractor.joinedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  
                  {filteredSubcontractors.length === 0 && (
                    <li className="px-4 py-6 text-center text-gray-500">
                      <Users className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p>Aucun sous-traitant trouvé</p>
                      <p className="text-sm">Essayez de modifier vos filtres ou votre recherche</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            {/* Subcontractor details */}
            <div className={`w-full lg:w-1/2 border-l border-gray-200 ${selectedSubcontractor ? 'block' : 'hidden lg:block'}`}>
              {selectedSubcontractor ? (
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          className="lg:hidden mr-2 p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          onClick={() => setSelectedSubcontractor(null)}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Détails du sous-traitant</h3>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                          <MessageSquare className="h-5 w-5" />
                        </button>
                        <button className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                          <Edit className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile */}
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16">
                        {selectedSubcontractor.avatar ? (
                          <img 
                            className="h-16 w-16 rounded-full" 
                            src={selectedSubcontractor.avatar} 
                            alt={selectedSubcontractor.name} 
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="h-10 w-10 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{selectedSubcontractor.name}</h2>
                            <div className="flex items-center mt-1">
                              {renderRating(selectedSubcontractor.rating)}
                              <span className="ml-2 text-sm text-gray-500">({selectedSubcontractor.completedTasks} tâches)</span>
                            </div>
                          </div>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccessLevelColor(selectedSubcontractor.accessLevel)}`}>
                            {getAccessLevelText(selectedSubcontractor.accessLevel)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Email</div>
                        <div className="mt-1 text-sm text-gray-900">{selectedSubcontractor.email}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Téléphone</div>
                        <div className="mt-1 text-sm text-gray-900">{selectedSubcontractor.phone}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Spécialités</div>
                        <div className="mt-1 text-sm text-gray-900">{selectedSubcontractor.specialty.join(', ')}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Statut</div>
                        <div className="mt-1">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubcontractorStatusColor(selectedSubcontractor.status)}`}>
                            {getSubcontractorStatusText(selectedSubcontractor.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tabs */}
                  <div className="px-4 py-3 bg-white border-b border-gray-200">
                    <div className="flex space-x-8">
                      <button
                        className="text-sm font-medium text-blue-600 pb-3 border-b-2 border-blue-600"
                      >
                        Tâches
                      </button>
                      <button
                        className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-3 border-b-2 border-transparent"
                      >
                        Évaluations
                      </button>
                      <button
                        className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-3 border-b-2 border-transparent"
                      >
                        Documents
                      </button>
                    </div>
                  </div>
                  
                  {/* Tasks list */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="px-4 py-3 flex justify-between items-center border-b border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900">Tâches récentes</h4>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Voir toutes les tâches
                      </button>
                    </div>
                    
                    <ul className="divide-y divide-gray-200">
                      {subcontractorTasks.length > 0 ? (
                        subcontractorTasks.map((task) => (
                          <li key={task.id} className="px-4 py-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium text-blue-600">{task.title}</div>
                                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTaskStatusColor(task.status)}`}>
                                    {getTaskStatusText(task.status)}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-500 mt-1">{task.projectName}</div>
                              </div>
                              <div className="flex flex-col items-end">
                                <div className="text-xs text-gray-500">Échéance</div>
                                <div className="text-sm text-gray-900">{formatDate(task.dueDate)}</div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                              {task.description}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-6 text-center text-gray-500">
                          <Briefcase className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p>Aucune tâche assignée</p>
                        </li>
                      )}
                    </ul>
                    
                    {/* Evaluations */}
                    <div className="px-4 py-3 flex justify-between items-center border-t border-b border-gray-200 mt-4">
                      <h4 className="text-sm font-medium text-gray-900">Évaluations récentes</h4>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Voir toutes les évaluations
                      </button>
                    </div>
                    
                    <ul className="divide-y divide-gray-200">
                      {subcontractorEvaluations.length > 0 ? (
                        subcontractorEvaluations.map((evaluation) => (
                          <li key={evaluation.id} className="px-4 py-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-blue-600">{evaluation.taskTitle}</div>
                                <div className="text-sm text-gray-500">{evaluation.projectName}</div>
                              </div>
                              <div>
                                {renderRating(evaluation.overallRating)}
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              {evaluation.feedback}
                            </div>
                            <div className="mt-2 text-xs text-gray-500 text-right">
                              Évalué par {evaluation.createdBy} le {formatDate(evaluation.createdAt)}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-6 text-center text-gray-500">
                          <Award className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p>Aucune évaluation disponible</p>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Actions */}
                  <div className="px-4 py-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Plus className="h-4 w-4 mr-2" />
                        Assigner une tâche
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Award className="h-4 w-4 mr-2" />
                        Évaluer
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun sous-traitant sélectionné</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Sélectionnez un sous-traitant pour voir les détails.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};