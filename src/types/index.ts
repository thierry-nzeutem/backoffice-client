// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  company?: string;
  phone?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
  PREVENTIONIST = 'preventionist',
  SUBCONTRACTOR = 'subcontractor'
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  status: ProjectStatus;
  type: ProjectType;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  assignedTo?: string[];
  location?: string;
  buildingType?: string;
}

export enum ProjectStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  COMPLETED = 'completed',
  ARCHIVED = 'archived'
}

export enum ProjectType {
  ANNUAL_MONITORING = 'annual_monitoring',
  SECURITY_AUDIT = 'security_audit',
  ACCESSIBILITY_AUDIT = 'accessibility_audit',
  ERP_FILE_INSTRUCTION = 'erp_file_instruction',
  CSSI = 'cssi',
  AMO = 'amo',
  AT_FILE = 'at_file'
}

// Document types
export interface Document {
  id: string;
  projectId: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  annotations?: Annotation[];
  comments?: Comment[];
  approvedBy?: string;
  approvedAt?: Date;
}

export enum DocumentType {
  TEXT = 'text',
  PLAN = 'plan',
  FORM = 'form',
  REPORT = 'report',
  QUOTE = 'quote',
  CONTRACT = 'contract',
  INVOICE = 'invoice',
  OTHER = 'other'
}

export enum DocumentStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ARCHIVED = 'archived'
}

// Annotation types
export interface Annotation {
  id: string;
  documentId: string;
  userId: string;
  content: string;
  type: AnnotationType;
  coordinates: Coordinates;
  createdAt: Date;
  updatedAt: Date;
}

export enum AnnotationType {
  TEXT = 'text',
  DRAWING = 'drawing',
  HIGHLIGHT = 'highlight',
  COMMENT = 'comment'
}

export interface Coordinates {
  x: number;
  y: number;
  width?: number;
  height?: number;
  points?: {x: number, y: number}[];
}

// Communication types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  readBy: string[];
  attachments?: Attachment[];
}

export interface Conversation {
  id: string;
  projectId?: string;
  participants: string[];
  title?: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedAt: Date;
  uploadedBy: string;
}

// Comment types
export interface Comment {
  id: string;
  documentId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
}

// Commercial types
export interface Quote {
  id: string;
  projectId: string;
  clientId: string;
  status: QuoteStatus;
  amount: number;
  currency: string;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
  items: QuoteItem[];
  notes?: string;
  terms?: string;
  signedAt?: Date;
  signedBy?: string;
  signatureUrl?: string;
}

export enum QuoteStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  VIEWED = 'viewed',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface QuoteItem {
  id: string;
  quoteId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  linkTo?: string;
  relatedId?: string;
}

export enum NotificationType {
  DOCUMENT_UPLOADED = 'document_uploaded',
  DOCUMENT_UPDATED = 'document_updated',
  DOCUMENT_APPROVED = 'document_approved',
  DOCUMENT_REJECTED = 'document_rejected',
  NEW_MESSAGE = 'new_message',
  QUOTE_SENT = 'quote_sent',
  QUOTE_ACCEPTED = 'quote_accepted',
  PROJECT_STATUS_CHANGED = 'project_status_changed',
  TASK_ASSIGNED = 'task_assigned',
  TASK_COMPLETED = 'task_completed',
  DEADLINE_APPROACHING = 'deadline_approaching'
}