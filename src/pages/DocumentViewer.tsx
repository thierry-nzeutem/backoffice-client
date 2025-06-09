import React, { useState, useRef, useEffect } from 'react';
import { 
  Lock,
  Eye,
  EyeOff,
  Check, 
  X, 
  MessageSquare, 
  History, 
  Layers, 
  Edit3, 
  Square, 
  Circle, 
  Type, 
  Trash2,
  Save,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { DocumentType } from '../types';
import { SecurityBanner } from '../components/SecurityBanner';

interface Annotation {
  id: string;
  type: 'text' | 'rectangle' | 'circle' | 'freehand';
  content?: string;
  position: { x: number; y: number; width?: number; height?: number; points?: {x: number, y: number}[] };
  color: string;
  author: string;
  timestamp: Date;
}

interface DocumentViewerProps {
  documentId?: string;
  documentType: DocumentType;
  documentUrl: string;
  documentName: string;
  isProtected?: boolean;
  canAnnotate?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentId = '1',
  documentType,
  documentUrl,
  documentName,
  isProtected = true,
  canAnnotate = true,
  onApprove,
  onReject
}) => {
  // State for document viewer
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showWatermark, setShowWatermark] = useState(isProtected);
  const [activeLayer, setActiveLayer] = useState('annotations');
  
  // State for annotations
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState<Partial<Annotation> | null>(null);
  const [annotationTool, setAnnotationTool] = useState<'text' | 'rectangle' | 'circle' | 'freehand' | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [textInputValue, setTextInputValue] = useState('');
  const [textInputPosition, setTextInputPosition] = useState<{x: number, y: number} | null>(null);
  
  // State for comments
  const [comments, setComments] = useState<{id: string, author: string, text: string, timestamp: Date}[]>([
    {
      id: '1',
      author: 'Marie Dupont',
      text: 'Veuillez vérifier les dimensions de la sortie de secours au niveau -1.',
      timestamp: new Date('2025-05-10T14:30:00')
    },
    {
      id: '2',
      author: 'Jean Martin',
      text: 'Les normes d\'accessibilité PMR ne sont pas respectées dans cette zone.',
      timestamp: new Date('2025-05-11T09:15:00')
    }
  ]);
  const [newComment, setNewComment] = useState('');
  
  // State for version history
  const [versions, setVersions] = useState([
    { id: '1', version: '1.0', author: 'Pierre Durand', date: new Date('2025-05-01T10:00:00'), status: 'Approuvé' },
    { id: '2', version: '1.1', author: 'Marie Dupont', date: new Date('2025-05-08T14:30:00'), status: 'En révision' },
    { id: '3', version: '1.2', author: 'Jean Martin', date: new Date('2025-05-10T09:15:00'), status: 'Actuel' }
  ]);
  
  // Refs
  const documentContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mock user info
  const currentUser = {
    id: 'user1',
    name: 'Sophie Bernard',
    role: 'Client'
  };
  
  // Generate a unique watermark ID for this session
  const watermarkId = useRef(`WM-${documentId}-${Date.now().toString(36)}`);
  
  // Initialize canvas when component mounts
  useEffect(() => {
    if (canvasRef.current && documentContainerRef.current) {
      const canvas = canvasRef.current;
      const container = documentContainerRef.current;
      
      // Set canvas size to match container
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Draw initial document
      drawDocument();
    }
    
    // Add event listeners to prevent right-click and keyboard shortcuts
    if (isProtected) {
      document.addEventListener('contextmenu', preventContextMenu);
      document.addEventListener('keydown', preventKeyboardShortcuts);
      
      return () => {
        document.removeEventListener('contextmenu', preventContextMenu);
        document.removeEventListener('keydown', preventKeyboardShortcuts);
      };
    }
  }, []);
  
  // Redraw document when scale, rotation, or annotations change
  useEffect(() => {
    drawDocument();
  }, [scale, rotation, showAnnotations, annotations, selectedAnnotation]);
  
  // Security functions
  const preventContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    return false;
  };
  
  const preventKeyboardShortcuts = (e: KeyboardEvent) => {
    // Prevent Ctrl+P (Print), Ctrl+S (Save), Ctrl+C (Copy), etc.
    if ((e.ctrlKey || e.metaKey) && 
        (e.key === 'p' || e.key === 's' || e.key === 'c' || e.key === 'x')) {
      e.preventDefault();
      return false;
    }
  };
  
  // Draw the document and annotations on canvas
  const drawDocument = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw document (placeholder for actual document rendering)
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    
    // Draw a placeholder for the document
    if (documentType === DocumentType.PLAN) {
      drawPlanPlaceholder(ctx, canvas.width, canvas.height);
    } else {
      drawTextDocumentPlaceholder(ctx, canvas.width, canvas.height);
    }
    
    ctx.restore();
    
    // Draw watermark if enabled
    if (showWatermark) {
      drawWatermark(ctx, canvas.width, canvas.height);
    }
    
    // Draw annotations if enabled
    if (showAnnotations) {
      drawAllAnnotations(ctx);
    }
  };
  
  // Draw a placeholder for architectural plans
  const drawPlanPlaceholder = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const planWidth = width * 0.8;
    const planHeight = height * 0.8;
    
    ctx.translate(-planWidth / 2, -planHeight / 2);
    
    // Draw plan background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, planWidth, planHeight);
    
    // Draw grid lines
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 0.5;
    
    const gridSize = 20;
    for (let x = 0; x <= planWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, planHeight);
      ctx.stroke();
    }
    
    for (let y = 0; y <= planHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(planWidth, y);
      ctx.stroke();
    }
    
    // Draw some walls and rooms (simplified floor plan)
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    
    // Outer walls
    ctx.strokeRect(50, 50, planWidth - 100, planHeight - 100);
    
    // Inner walls
    ctx.beginPath();
    // Horizontal divider
    ctx.moveTo(50, planHeight / 2);
    ctx.lineTo(planWidth - 50, planHeight / 2);
    // Vertical dividers
    ctx.moveTo(planWidth / 3, 50);
    ctx.lineTo(planWidth / 3, planHeight - 50);
    ctx.moveTo(2 * planWidth / 3, 50);
    ctx.lineTo(2 * planWidth / 3, planHeight - 50);
    ctx.stroke();
    
    // Doors
    ctx.strokeStyle = '#555555';
    // Door symbols
    drawDoor(ctx, planWidth / 3, planHeight / 2 - 30, 30, 0);
    drawDoor(ctx, 2 * planWidth / 3, planHeight / 2 - 30, 30, 0);
    drawDoor(ctx, planWidth / 2, planHeight - 50, 30, 90);
    
    // Windows
    ctx.strokeStyle = '#888888';
    drawWindow(ctx, 150, 50, 60);
    drawWindow(ctx, 350, 50, 60);
    drawWindow(ctx, 550, 50, 60);
    drawWindow(ctx, 150, planHeight - 50, 60);
    drawWindow(ctx, 350, planHeight - 50, 60);
    drawWindow(ctx, 550, planHeight - 50, 60);
    
    // Add some text labels
    ctx.fillStyle = '#333333';
    ctx.font = '12px Arial';
    ctx.fillText('BUREAU 1', planWidth / 6, planHeight / 4);
    ctx.fillText('BUREAU 2', planWidth / 2, planHeight / 4);
    ctx.fillText('BUREAU 3', 5 * planWidth / 6, planHeight / 4);
    ctx.fillText('SALLE DE RÉUNION', planWidth / 3, 3 * planHeight / 4);
    ctx.fillText('ESPACE DÉTENTE', 2 * planWidth / 3, 3 * planHeight / 4);
    
    // Add a scale indicator
    ctx.fillStyle = '#333333';
    ctx.fillText('ÉCHELLE: 1:100', planWidth - 150, planHeight - 20);
    
    // Add a north arrow
    drawNorthArrow(ctx, planWidth - 50, 100);
  };
  
  // Draw a door symbol
  const drawDoor = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.arc(0, 0, size, 0, Math.PI / 2, false);
    ctx.stroke();
    
    ctx.restore();
  };
  
  // Draw a window symbol
  const drawWindow = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number) => {
    ctx.beginPath();
    ctx.moveTo(x - width / 2, y);
    ctx.lineTo(x + width / 2, y);
    ctx.stroke();
    
    // Window panes
    ctx.beginPath();
    ctx.moveTo(x - width / 2, y - 5);
    ctx.lineTo(x + width / 2, y - 5);
    ctx.moveTo(x - width / 2, y + 5);
    ctx.lineTo(x + width / 2, y + 5);
    ctx.stroke();
  };
  
  // Draw a north arrow
  const drawNorthArrow = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    
    // Arrow
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(10, 10);
    ctx.lineTo(0, 0);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.fillStyle = '#333333';
    ctx.fill();
    
    // N label
    ctx.fillStyle = '#333333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('N', 0, -25);
    
    ctx.restore();
  };
  
  // Draw a placeholder for text documents
  const drawTextDocumentPlaceholder = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const docWidth = width * 0.6;
    const docHeight = height * 0.8;
    
    ctx.translate(-docWidth / 2, -docHeight / 2);
    
    // Draw document background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, docWidth, docHeight);
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, docWidth, docHeight);
    
    // Draw document header
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, docWidth, 60);
    ctx.strokeRect(0, 0, docWidth, 60);
    
    // Draw logo placeholder
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(20, 10, 40, 40);
    
    // Draw title
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(documentName, 80, 30);
    
    // Draw document date
    ctx.font = '12px Arial';
    ctx.fillText('Date: 12/05/2025', 80, 50);
    
    // Draw document content (text lines)
    ctx.fillStyle = '#333333';
    ctx.font = '12px Arial';
    
    const lineHeight = 20;
    const startY = 100;
    const textX = 40;
    
    // Simulate paragraphs
    for (let i = 0; i < 15; i++) {
      const y = startY + i * lineHeight * 1.5;
      
      // Paragraph title
      if (i % 3 === 0) {
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`${i + 1}. Section du document`, textX, y);
        ctx.font = '12px Arial';
        continue;
      }
      
      // Text lines
      const lineWidth = Math.random() * 0.4 + 0.5; // Random line length between 50% and 90%
      ctx.fillRect(textX, y, docWidth * lineWidth - 80, 2);
      
      // Add some bullet points occasionally
      if (i % 3 === 2) {
        const bulletY = y + lineHeight;
        ctx.beginPath();
        ctx.arc(textX + 5, bulletY - 4, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(textX + 15, bulletY - 4, docWidth * 0.6 - 80, 2);
        
        ctx.beginPath();
        ctx.arc(textX + 5, bulletY + lineHeight - 4, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(textX + 15, bulletY + lineHeight - 4, docWidth * 0.7 - 80, 2);
        
        i++; // Skip a line
      }
    }
    
    // Draw footer
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, docHeight - 30, docWidth, 30);
    ctx.strokeRect(0, docHeight - 30, docWidth, 30);
    
    ctx.fillStyle = '#333333';
    ctx.font = '10px Arial';
    ctx.fillText('Prévéris - Document confidentiel', 20, docHeight - 15);
    ctx.fillText(`Page ${currentPage}/${totalPages}`, docWidth - 100, docHeight - 15);
  };
  
  // Draw watermark across the document
  const drawWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    
    // Set watermark style
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#FF0000';
    ctx.font = '16px Arial';
    
    // Create watermark text with user info and unique ID
    const watermarkText = `CONFIDENTIEL - ${currentUser.name} - ${watermarkId.current} - ${new Date().toLocaleString()}`;
    
    // Rotate canvas for diagonal watermark
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 4);
    
    // Calculate text metrics
    const textMetrics = ctx.measureText(watermarkText);
    const textWidth = textMetrics.width;
    
    // Draw repeated watermark pattern
    const spacing = textWidth + 100;
    const repetitions = Math.ceil((width + height) / spacing) * 2;
    
    for (let i = -repetitions; i < repetitions; i++) {
      ctx.fillText(watermarkText, i * spacing - width / 2, 0);
      ctx.fillText(watermarkText, i * spacing - width / 2, -200);
      ctx.fillText(watermarkText, i * spacing - width / 2, 200);
      ctx.fillText(watermarkText, i * spacing - width / 2, -400);
      ctx.fillText(watermarkText, i * spacing - width / 2, 400);
    }
    
    ctx.restore();
  };
  
  // Draw all annotations on the canvas
  const drawAllAnnotations = (ctx: CanvasRenderingContext2D) => {
    annotations.forEach(annotation => {
      drawAnnotation(ctx, annotation, annotation.id === selectedAnnotation);
    });
    
    // Draw current annotation being created
    if (currentAnnotation && isDrawing) {
      drawAnnotation(ctx, currentAnnotation as Annotation, true);
    }
  };
  
  // Draw a single annotation
  const drawAnnotation = (ctx: CanvasRenderingContext2D, annotation: Partial<Annotation>, isSelected: boolean) => {
    if (!annotation.position) return;
    
    ctx.save();
    
    // Set styles based on annotation type and selection state
    ctx.strokeStyle = annotation.color || '#FF0000';
    ctx.fillStyle = annotation.color || '#FF0000';
    ctx.lineWidth = isSelected ? 3 : 2;
    
    if (isSelected) {
      ctx.setLineDash([5, 3]);
    }
    
    const { x, y, width, height, points } = annotation.position;
    
    switch (annotation.type) {
      case 'rectangle':
        if (width && height) {
          ctx.strokeRect(x, y, width, height);
          
          // Fill with semi-transparent color
          ctx.globalAlpha = 0.1;
          ctx.fillRect(x, y, width, height);
          ctx.globalAlpha = 1.0;
        }
        break;
        
      case 'circle':
        if (width) {
          const radius = width / 2;
          ctx.beginPath();
          ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
          ctx.stroke();
          
          // Fill with semi-transparent color
          ctx.globalAlpha = 0.1;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
        break;
        
      case 'text':
        ctx.font = '16px Arial';
        ctx.fillStyle = annotation.color || '#FF0000';
        if (annotation.content) {
          ctx.fillText(annotation.content, x, y);
        }
        break;
        
      case 'freehand':
        if (points && points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          
          ctx.stroke();
        }
        break;
    }
    
    // Draw selection handles if selected
    if (isSelected && annotation.type !== 'freehand' && annotation.type !== 'text') {
      drawSelectionHandles(ctx, annotation.position);
    }
    
    ctx.restore();
  };
  
  // Draw selection handles around a selected annotation
  const drawSelectionHandles = (ctx: CanvasRenderingContext2D, position: { x: number; y: number; width?: number; height?: number }) => {
    const { x, y, width, height } = position;
    
    if (!width || !height) return;
    
    const handleSize = 8;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    
    // Draw handles at corners and midpoints
    const handles = [
      { x, y }, // top-left
      { x: x + width / 2, y }, // top-middle
      { x: x + width, y }, // top-right
      { x, y: y + height / 2 }, // middle-left
      { x: x + width, y: y + height / 2 }, // middle-right
      { x, y: y + height }, // bottom-left
      { x: x + width / 2, y: y + height }, // bottom-middle
      { x: x + width, y: y + height } // bottom-right
    ];
    
    handles.forEach(handle => {
      ctx.beginPath();
      ctx.rect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize);
      ctx.fill();
      ctx.stroke();
    });
  };
  
  // Handle mouse down event for drawing
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canAnnotate || !annotationTool) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    
    // Initialize new annotation based on selected tool
    switch (annotationTool) {
      case 'rectangle':
      case 'circle':
        setCurrentAnnotation({
          type: annotationTool,
          position: { x, y, width: 0, height: 0 },
          color: '#FF0000'
        });
        break;
        
      case 'freehand':
        setCurrentAnnotation({
          type: 'freehand',
          position: { x, y, points: [{ x, y }] },
          color: '#FF0000'
        });
        break;
        
      case 'text':
        // For text, we'll show an input at the clicked position
        setTextInputPosition({ x, y });
        setTextInputValue('');
        break;
    }
  };
  
  // Handle mouse move event for drawing
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAnnotation || !annotationTool) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update current annotation based on mouse movement
    switch (annotationTool) {
      case 'rectangle':
      case 'circle':
        if (currentAnnotation.position) {
          const startX = currentAnnotation.position.x;
          const startY = currentAnnotation.position.y;
          
          setCurrentAnnotation({
            ...currentAnnotation,
            position: {
              x: startX,
              y: startY,
              width: x - startX,
              height: y - startY
            }
          });
        }
        break;
        
      case 'freehand':
        if (currentAnnotation.position && currentAnnotation.position.points) {
          const newPoints = [...currentAnnotation.position.points, { x, y }];
          
          setCurrentAnnotation({
            ...currentAnnotation,
            position: {
              ...currentAnnotation.position,
              points: newPoints
            }
          });
        }
        break;
    }
  };
  
  // Handle mouse up event for drawing
  const handleMouseUp = () => {
    if (!isDrawing || !currentAnnotation || !annotationTool) {
      setIsDrawing(false);
      return;
    }
    
    // Finalize the annotation
    if (annotationTool !== 'text') {
      const newAnnotation: Annotation = {
        id: `annotation-${Date.now()}`,
        type: currentAnnotation.type as 'rectangle' | 'circle' | 'freehand' | 'text',
        position: currentAnnotation.position as { x: number; y: number; width?: number; height?: number; points?: {x: number, y: number}[] },
        color: currentAnnotation.color || '#FF0000',
        content: currentAnnotation.content,
        author: currentUser.name,
        timestamp: new Date()
      };
      
      setAnnotations([...annotations, newAnnotation]);
    }
    
    setIsDrawing(false);
    setCurrentAnnotation(null);
  };
  
  // Handle text input for text annotations
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(e.target.value);
  };
  
  // Handle text input keydown for text annotations
  const handleTextInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && textInputPosition) {
      // Create a new text annotation
      const newAnnotation: Annotation = {
        id: `annotation-${Date.now()}`,
        type: 'text',
        position: { x: textInputPosition.x, y: textInputPosition.y },
        color: '#FF0000',
        content: textInputValue,
        author: currentUser.name,
        timestamp: new Date()
      };
      
      setAnnotations([...annotations, newAnnotation]);
      setTextInputPosition(null);
      setTextInputValue('');
      setAnnotationTool(null);
    } else if (e.key === 'Escape') {
      setTextInputPosition(null);
      setTextInputValue('');
      setAnnotationTool(null);
    }
  };
  
  // Handle annotation tool selection
  const handleSelectTool = (tool: 'text' | 'rectangle' | 'circle' | 'freehand' | null) => {
    setAnnotationTool(tool);
    setSelectedAnnotation(null);
    setTextInputPosition(null);
  };
  
  // Handle annotation selection
  const handleSelectAnnotation = (id: string) => {
    setSelectedAnnotation(id === selectedAnnotation ? null : id);
    setAnnotationTool(null);
  };
  
  // Handle annotation deletion
  const handleDeleteAnnotation = () => {
    if (selectedAnnotation) {
      setAnnotations(annotations.filter(a => a.id !== selectedAnnotation));
      setSelectedAnnotation(null);
    }
  };
  
  // Handle new comment submission
  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: `comment-${Date.now()}`,
        author: currentUser.name,
        text: newComment,
        timestamp: new Date()
      };
      
      setComments([...comments, comment]);
      setNewComment('');
    }
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">{documentName}</h2>
            {isProtected && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <Lock className="h-3 w-3 mr-1" />
                Protégé
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            {onApprove && (
              <button
                onClick={onApprove}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Check className="h-4 w-4 mr-1" />
                Approuver
              </button>
            )}
            {onReject && (
              <button
                onClick={onReject}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <X className="h-4 w-4 mr-1" />
                Rejeter
              </button>
            )}
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm ${
                showAnnotations ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-700'
              } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {showAnnotations ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Masquer annotations
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  Afficher annotations
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isProtected && (
        <div className="px-4 py-2">
          <SecurityBanner 
            documentType={documentType === DocumentType.PLAN ? 'plan' : 'report'} 
            isProtected={isProtected}
          />
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row">
        {/* Document viewer */}
        <div className="flex-1 relative">
          {/* Document toolbar */}
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setScale(scale + 0.1)}
                className="p-1 rounded-md hover:bg-gray-200"
                title="Zoom in"
              >
                <ZoomIn className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                className="p-1 rounded-md hover:bg-gray-200"
                title="Zoom out"
              >
                <ZoomOut className="h-5 w-5 text-gray-600" />
              </button>
              <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
              
              <div className="mx-2 h-6 border-l border-gray-300"></div>
              
              <button
                onClick={() => setRotation((rotation + 90) % 360)}
                className="p-1 rounded-md hover:bg-gray-200"
                title="Rotate"
              >
                <RotateCw className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="mx-2 h-6 border-l border-gray-300"></div>
              
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-1 rounded-md ${
                  currentPage === 1 ? 'text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-1 rounded-md ${
                  currentPage === totalPages ? 'text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            {isProtected && (
              <div className="flex items-center">
                <span className="text-xs text-red-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Téléchargement désactivé
                </span>
              </div>
            )}
          </div>
          
          {/* Document canvas */}
          <div 
            ref={documentContainerRef}
            className="relative bg-gray-200 overflow-auto h-[600px] flex items-center justify-center"
          >
            <canvas
              ref={canvasRef}
              className="cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            
            {/* Text input for text annotations */}
            {textInputPosition && (
              <div
                style={{
                  position: 'absolute',
                  left: `${textInputPosition.x}px`,
                  top: `${textInputPosition.y - 20}px`,
                  zIndex: 10
                }}
              >
                <input
                  type="text"
                  value={textInputValue}
                  onChange={handleTextInputChange}
                  onKeyDown={handleTextInputKeyDown}
                  autoFocus
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="Saisir le texte (Entrée pour valider)"
                />
              </div>
            )}
          </div>
          
          {/* Annotation toolbar (only shown if canAnnotate is true) */}
          {canAnnotate && (
            <div className="bg-gray-100 px-4 py-2 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSelectTool('text')}
                  className={`p-2 rounded-md ${
                    annotationTool === 'text' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Ajouter du texte"
                >
                  <Type className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSelectTool('rectangle')}
                  className={`p-2 rounded-md ${
                    annotationTool === 'rectangle' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Dessiner un rectangle"
                >
                  <Square className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSelectTool('circle')}
                  className={`p-2 rounded-md ${
                    annotationTool === 'circle' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Dessiner un cercle"
                >
                  <Circle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSelectTool('freehand')}
                  className={`p-2 rounded-md ${
                    annotationTool === 'freehand' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Dessin à main levée"
                >
                  <Edit3 className="h-5 w-5" />
                </button>
                
                <div className="mx-2 h-6 border-l border-gray-300"></div>
                
                <button
                  onClick={handleDeleteAnnotation}
                  disabled={!selectedAnnotation}
                  className={`p-2 rounded-md ${
                    selectedAnnotation ? 'hover:bg-red-100 text-red-600' : 'text-gray-400'
                  }`}
                  title="Supprimer l'annotation"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                
                <div className="mx-2 h-6 border-l border-gray-300"></div>
                
                <button
                  onClick={() => setActiveLayer('annotations')}
                  className={`p-2 rounded-md ${
                    activeLayer === 'annotations' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Calque d'annotations"
                >
                  <Layers className="h-5 w-5" />
                </button>
              </div>
              
              <div>
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Enregistrer les annotations
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 border-l border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveLayer('comments')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeLayer === 'comments'
                    ? 'text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="h-4 w-4 inline mr-1" />
                Commentaires
              </button>
              <button
                onClick={() => setActiveLayer('history')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeLayer === 'history'
                    ? 'text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <History className="h-4 w-4 inline mr-1" />
                Historique
              </button>
            </div>
          </div>
          
          {/* Comments panel */}
          {activeLayer === 'comments' && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-4">
                  {comments.map(comment => (
                    <li key={comment.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{comment.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <button
                    onClick={handleAddComment}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* History panel */}
          {activeLayer === 'history' && (
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-4">
                {versions.map(version => (
                  <li key={version.id} className="border-l-2 border-blue-500 pl-3 py-2">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-gray-900">Version {version.version}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        version.status === 'Approuvé' ? 'bg-green-100 text-green-800' :
                        version.status === 'En révision' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {version.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Par {version.author} le {formatDate(version.date)}
                    </p>
                    <div className="mt-2">
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        Voir cette version
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};