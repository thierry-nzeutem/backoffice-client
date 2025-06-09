import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Paperclip, 
  Video, 
  Phone, 
  MoreVertical, 
  Search,
  ChevronLeft,
  File,
  Smile,
  Clock,
  Check,
  CheckCheck,
  User,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
    online: boolean;
    lastSeen?: Date;
  }[];
  title?: string;
  projectId?: string;
  projectName?: string;
  unreadCount: number;
  lastMessage?: {
    content: string;
    timestamp: Date;
    senderId: string;
  };
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'other';
  url: string;
  size: number;
  thumbnailUrl?: string;
}

export const ChatModule: React.FC = () => {
  // Current user (mock data)
  const currentUser = {
    id: 'user1',
    name: 'Jean Martin',
    role: 'Client',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };
  
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileConversationList, setShowMobileConversationList] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock data initialization
  useEffect(() => {
    // Mock conversations
    const mockConversations: Conversation[] = [
      {
        id: 'conv1',
        participants: [
          {
            id: 'user1',
            name: 'Jean Martin',
            role: 'Client',
            online: true,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 'user2',
            name: 'Marie Dupont',
            role: 'Préventionniste',
            online: true,
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        ],
        projectId: 'proj1',
        projectName: 'Audit de sécurité - Restaurant Le Gourmet',
        unreadCount: 2,
        lastMessage: {
          content: 'Bonjour, j\'ai une question concernant le rapport préliminaire.',
          timestamp: new Date('2025-05-12T10:30:00'),
          senderId: 'user1'
        }
      },
      {
        id: 'conv2',
        participants: [
          {
            id: 'user1',
            name: 'Jean Martin',
            role: 'Client',
            online: true,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 'user3',
            name: 'Pierre Durand',
            role: 'Préventionniste',
            online: false,
            lastSeen: new Date('2025-05-12T09:15:00'),
            avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        ],
        projectId: 'proj2',
        projectName: 'Mise en conformité accessibilité - Boutique Mode & Style',
        unreadCount: 0,
        lastMessage: {
          content: 'Les modifications ont été prises en compte. Je vous envoie le document mis à jour.',
          timestamp: new Date('2025-05-11T16:45:00'),
          senderId: 'user3'
        }
      },
      {
        id: 'conv3',
        title: 'Équipe Projet Hôtel Bellevue',
        participants: [
          {
            id: 'user1',
            name: 'Jean Martin',
            role: 'Client',
            online: true,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 'user2',
            name: 'Marie Dupont',
            role: 'Préventionniste',
            online: true,
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 'user3',
            name: 'Pierre Durand',
            role: 'Préventionniste',
            online: false,
            lastSeen: new Date('2025-05-12T09:15:00'),
            avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 'user4',
            name: 'Sophie Bernard',
            role: 'Sous-traitant',
            online: false,
            lastSeen: new Date('2025-05-11T18:30:00'),
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        ],
        projectId: 'proj3',
        projectName: 'Suivi annuel - Hôtel Bellevue',
        unreadCount: 0,
        lastMessage: {
          content: 'La commission de sécurité est confirmée pour le 5 juin à 9h.',
          timestamp: new Date('2025-05-10T11:20:00'),
          senderId: 'user2'
        }
      }
    ];
    
    setConversations(mockConversations);
    
    // Set first conversation as selected by default
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0]);
      
      // Load messages for the first conversation
      const mockMessages: Message[] = [
        {
          id: 'msg1',
          conversationId: 'conv1',
          senderId: 'user2',
          senderName: 'Marie Dupont',
          content: 'Bonjour Monsieur Martin, je suis Marie Dupont, préventionniste en charge de votre dossier pour le Restaurant Le Gourmet.',
          timestamp: new Date('2025-05-12T09:30:00'),
          status: 'read'
        },
        {
          id: 'msg2',
          conversationId: 'conv1',
          senderId: 'user2',
          senderName: 'Marie Dupont',
          content: 'Je viens de déposer le rapport préliminaire dans votre espace documents. Pourriez-vous le consulter et me faire part de vos remarques ?',
          timestamp: new Date('2025-05-12T09:32:00'),
          status: 'read'
        },
        {
          id: 'msg3',
          conversationId: 'conv1',
          senderId: 'user1',
          senderName: 'Jean Martin',
          content: 'Bonjour Madame Dupont, merci pour votre message. Je vais consulter le rapport dès que possible.',
          timestamp: new Date('2025-05-12T10:15:00'),
          status: 'read'
        },
        {
          id: 'msg4',
          conversationId: 'conv1',
          senderId: 'user1',
          senderName: 'Jean Martin',
          content: 'Bonjour, j\'ai une question concernant le rapport préliminaire. Dans la section 3.2, vous mentionnez un problème avec l\'issue de secours du sous-sol. Pourriez-vous préciser quelles modifications seraient nécessaires ?',
          timestamp: new Date('2025-05-12T10:30:00'),
          status: 'delivered',
          attachments: [
            {
              id: 'att1',
              name: 'Capture d\'écran - Section 3.2',
              type: 'image',
              url: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              size: 245000,
              thumbnailUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
            }
          ]
        }
      ];
      
      setMessages(mockMessages);
    }
  }, []);
  
  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowMobileConversationList(false);
    
    // Load messages for the selected conversation (mock data)
    if (conversation.id === 'conv1') {
      const mockMessages: Message[] = [
        {
          id: 'msg1',
          conversationId: 'conv1',
          senderId: 'user2',
          senderName: 'Marie Dupont',
          content: 'Bonjour Monsieur Martin, je suis Marie Dupont, préventionniste en charge de votre dossier pour le Restaurant Le Gourmet.',
          timestamp: new Date('2025-05-12T09:30:00'),
          status: 'read'
        },
        {
          id: 'msg2',
          conversationId: 'conv1',
          senderId: 'user2',
          senderName: 'Marie Dupont',
          content: 'Je viens de déposer le rapport préliminaire dans votre espace documents. Pourriez-vous le consulter et me faire part de vos remarques ?',
          timestamp: new Date('2025-05-12T09:32:00'),
          status: 'read'
        },
        {
          id: 'msg3',
          conversationId: 'conv1',
          senderId: 'user1',
          senderName: 'Jean Martin',
          content: 'Bonjour Madame Dupont, merci pour votre message. Je vais consulter le rapport dès que possible.',
          timestamp: new Date('2025-05-12T10:15:00'),
          status: 'read'
        },
        {
          id: 'msg4',
          conversationId: 'conv1',
          senderId: 'user1',
          senderName: 'Jean Martin',
          content: 'Bonjour, j\'ai une question concernant le rapport préliminaire. Dans la section 3.2, vous mentionnez un problème avec l\'issue de secours du sous-sol. Pourriez-vous préciser quelles modifications seraient nécessaires ?',
          timestamp: new Date('2025-05-12T10:30:00'),
          status: 'delivered',
          attachments: [
            {
              id: 'att1',
              name: 'Capture d\'écran - Section 3.2',
              type: 'image',
              url: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              size: 245000,
              thumbnailUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
            }
          ]
        }
      ];
      
      setMessages(mockMessages);
    } else if (conversation.id === 'conv2') {
      const mockMessages: Message[] = [
        {
          id: 'msg1',
          conversationId: 'conv2',
          senderId: 'user3',
          senderName: 'Pierre Durand',
          content: 'Bonjour Monsieur Martin, suite à notre visite de la semaine dernière, j\'ai préparé le rapport de diagnostic accessibilité pour votre boutique.',
          timestamp: new Date('2025-05-11T14:20:00'),
          status: 'read'
        },
        {
          id: 'msg2',
          conversationId: 'conv2',
          senderId: 'user1',
          senderName: 'Jean Martin',
          content: 'Merci Pierre. J\'ai quelques questions concernant les aménagements proposés pour l\'entrée principale. Le seuil de 2cm est-il vraiment obligatoire ?',
          timestamp: new Date('2025-05-11T15:30:00'),
          status: 'read'
        },
        {
          id: 'msg3',
          conversationId: 'conv2',
          senderId: 'user3',
          senderName: 'Pierre Durand',
          content: 'Oui, la réglementation impose un ressaut maximum de 2cm pour garantir l\'accessibilité aux personnes en fauteuil roulant. Cependant, nous pouvons envisager une solution avec un plan incliné intégré qui serait esthétiquement acceptable.',
          timestamp: new Date('2025-05-11T16:15:00'),
          status: 'read',
          attachments: [
            {
              id: 'att1',
              name: 'Exemple_plan_incliné.pdf',
              type: 'document',
              url: '#',
              size: 1250000
            }
          ]
        },
        {
          id: 'msg4',
          conversationId: 'conv2',
          senderId: 'user1',
          senderName: 'Jean Martin',
          content: 'Je comprends. Pourriez-vous modifier le plan pour intégrer cette solution ?',
          timestamp: new Date('2025-05-11T16:40:00'),
          status: 'read'
        },
        {
          id: 'msg5',
          conversationId: 'conv2',
          senderId: 'user3',
          senderName: 'Pierre Durand',
          content: 'Les modifications ont été prises en compte. Je vous envoie le document mis à jour.',
          timestamp: new Date('2025-05-11T16:45:00'),
          status: 'read'
        }
      ];
      
      setMessages(mockMessages);
    } else if (conversation.id === 'conv3') {
      const mockMessages: Message[] = [
        {
          id: 'msg1',
          conversationId: 'conv3',
          senderId: 'user2',
          senderName: 'Marie Dupont',
          content: 'Bonjour à tous, je crée ce groupe pour faciliter la communication concernant le suivi annuel de l\'Hôtel Bellevue.',
          timestamp: new Date('2025-05-10T09:00:00'),
          status: 'read'
        },
        {
          id: 'msg2',
          conversationId: 'conv3',
          senderId: 'user3',
          senderName: 'Pierre Durand',
          content: 'Bonjour, j\'ai terminé la vérification des équipements de sécurité incendie. Tout est conforme, à l\'exception d\'un extincteur au 3ème étage qui doit être remplacé.',
          timestamp: new Date('2025-05-10T10:15:00'),
          status: 'read'
        },
        {
          id: 'msg3',
          conversationId: 'conv3',
          senderId: 'user4',
          senderName: 'Sophie Bernard',
          content: 'J\'ai contacté le fournisseur pour le remplacement de l\'extincteur. Il sera livré et installé lundi prochain.',
          timestamp: new Date('2025-05-10T10:45:00'),
          status: 'read'
        },
        {
          id: 'msg4',
          conversationId: 'conv3',
          senderId: 'user1',
          senderName: 'Jean Martin',
          content: 'Parfait, merci pour votre réactivité. Qu\'en est-il de la date de passage de la commission de sécurité ?',
          timestamp: new Date('2025-05-10T11:10:00'),
          status: 'read'
        },
        {
          id: 'msg5',
          conversationId: 'conv3',
          senderId: 'user2',
          senderName: 'Marie Dupont',
          content: 'La commission de sécurité est confirmée pour le 5 juin à 9h.',
          timestamp: new Date('2025-05-10T11:20:00'),
          status: 'read'
        }
      ];
      
      setMessages(mockMessages);
    }
    
    // Mark conversation as read
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 } 
          : conv
      )
    );
  };
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedConversation) return;
    
    // Create new message
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: newMessage,
      timestamp: new Date(),
      status: 'sending'
    };
    
    // Add message to state
    setMessages(prevMessages => [...prevMessages, newMsg]);
    
    // Clear input
    setNewMessage('');
    
    // Simulate message being sent and delivered
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMsg.id 
            ? { ...msg, status: 'sent' } 
            : msg
        )
      );
      
      // Simulate typing indicator
      setIsTyping(true);
      
      // Simulate response after a delay
      setTimeout(() => {
        setIsTyping(false);
        
        // Update message status to delivered
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === newMsg.id 
              ? { ...msg, status: 'delivered' } 
              : msg
          )
        );
        
        // Add response message if this is the first conversation
        if (selectedConversation.id === 'conv1') {
          const responseMsg: Message = {
            id: `msg-${Date.now() + 1}`,
            conversationId: selectedConversation.id,
            senderId: 'user2',
            senderName: 'Marie Dupont',
            content: 'Concernant l\'issue de secours du sous-sol, le problème principal est la largeur du passage qui est actuellement de 80cm. La réglementation exige un minimum de 90cm pour les ERP de type N. Nous recommandons d\'élargir cette issue et de remplacer la porte actuelle par un modèle coupe-feu avec barre anti-panique.',
            timestamp: new Date(),
            status: 'delivered'
          };
          
          setMessages(prevMessages => [...prevMessages, responseMsg]);
          
          // Update conversation with last message
          setConversations(prevConversations => 
            prevConversations.map(conv => 
              conv.id === selectedConversation.id 
                ? { 
                    ...conv, 
                    lastMessage: {
                      content: responseMsg.content,
                      timestamp: responseMsg.timestamp,
                      senderId: responseMsg.senderId
                    }
                  } 
                : conv
            )
          );
        }
      }, 3000);
    }, 1000);
  };
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    
    // Search in conversation title/project name
    if (conv.title?.toLowerCase().includes(query) || conv.projectName?.toLowerCase().includes(query)) {
      return true;
    }
    
    // Search in participants
    return conv.participants.some(p => p.name.toLowerCase().includes(query));
  });
  
  // Format date for display
  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date >= today) {
      return format(date, 'HH:mm', { locale: fr });
    } else if (date >= yesterday) {
      return 'Hier ' + format(date, 'HH:mm', { locale: fr });
    } else {
      return format(date, 'dd/MM/yyyy HH:mm', { locale: fr });
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Get other participants in a conversation (excluding current user)
  const getOtherParticipants = (conversation: Conversation) => {
    return conversation.participants.filter(p => p.id !== currentUser.id);
  };
  
  // Get conversation display name
  const getConversationDisplayName = (conversation: Conversation) => {
    if (conversation.title) return conversation.title;
    
    const otherParticipants = getOtherParticipants(conversation);
    
    if (otherParticipants.length === 1) {
      return otherParticipants[0].name;
    } else if (otherParticipants.length > 1) {
      return `${otherParticipants[0].name} et ${otherParticipants.length - 1} autres`;
    }
    
    return 'Conversation';
  };
  
  // Get avatar for conversation
  const getConversationAvatar = (conversation: Conversation) => {
    const otherParticipants = getOtherParticipants(conversation);
    
    if (otherParticipants.length >= 1) {
      return otherParticipants[0].avatar;
    }
    
    return undefined;
  };
  
  // Get online status text
  const getOnlineStatusText = (conversation: Conversation) => {
    const otherParticipants = getOtherParticipants(conversation);
    
    if (conversation.participants.length > 2) {
      const onlineCount = otherParticipants.filter(p => p.online).length;
      return `${onlineCount} en ligne`;
    } else if (otherParticipants.length === 1) {
      const participant = otherParticipants[0];
      if (participant.online) {
        return 'En ligne';
      } else if (participant.lastSeen) {
        return `Vu ${formatMessageDate(participant.lastSeen)}`;
      }
    }
    
    return '';
  };
  
  // Get message status icon
  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-gray-400" />;
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="h-[700px] flex flex-col md:flex-row">
        {/* Conversation list (hidden on mobile when a conversation is selected) */}
        <div className={`w-full md:w-80 border-r border-gray-200 ${showMobileConversationList ? 'block' : 'hidden md:block'}`}>
          {/* Search header */}
          <div className="p-4 border-b border-gray-200">
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
          </div>
          
          {/* Conversation list */}
          <div className="overflow-y-auto h-full">
            <ul className="divide-y divide-gray-200">
              {filteredConversations.map((conversation) => (
                <li 
                  key={conversation.id}
                  className={`hover:bg-gray-50 cursor-pointer ${selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''}`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 relative">
                        {getConversationAvatar(conversation) ? (
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={getConversationAvatar(conversation)} 
                            alt={getConversationDisplayName(conversation)} 
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                        )}
                        
                        {/* Online indicator */}
                        {getOtherParticipants(conversation).some(p => p.online) && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {getConversationDisplayName(conversation)}
                          </p>
                          {conversation.lastMessage && (
                            <p className="text-xs text-gray-500">
                              {formatMessageDate(conversation.lastMessage.timestamp)}
                            </p>
                          )}
                        </div>
                        {conversation.projectName && (
                          <p className="text-xs text-gray-500 truncate">
                            {conversation.projectName}
                          </p>
                        )}
                        {conversation.lastMessage && (
                          <p className="mt-1 text-sm text-gray-600 truncate">
                            {conversation.lastMessage.senderId === currentUser.id ? (
                              <span className="text-gray-400">Vous: </span>
                            ) : null}
                            {conversation.lastMessage.content}
                          </p>
                        )}
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="ml-2 flex-shrink-0">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs">
                            {conversation.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
              
              {filteredConversations.length === 0 && (
                <li className="px-4 py-6 text-center text-gray-500">
                  <Search className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                  <p>Aucune conversation trouvée</p>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${!showMobileConversationList ? 'block' : 'hidden md:block'}`}>
          {selectedConversation ? (
            <>
              {/* Chat header */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    className="md:hidden mr-2 text-gray-500"
                    onClick={() => setShowMobileConversationList(true)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <div className="flex-shrink-0 relative">
                    {getConversationAvatar(selectedConversation) ? (
                      <img 
                        className="h-8 w-8 rounded-full" 
                        src={getConversationAvatar(selectedConversation)} 
                        alt={getConversationDisplayName(selectedConversation)} 
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                    
                    {/* Online indicator */}
                    {getOtherParticipants(selectedConversation).some(p => p.online) && (
                      <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-1 ring-white"></span>
                    )}
                  </div>
                  
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {getConversationDisplayName(selectedConversation)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getOnlineStatusText(selectedConversation)}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.senderId === currentUser.id ? 'order-2' : 'order-1'}`}>
                        {/* Sender name (only show for group conversations and if not the current user) */}
                        {selectedConversation.participants.length > 2 && message.senderId !== currentUser.id && (
                          <p className="text-xs text-gray-500 mb-1 ml-1">
                            {message.senderName}
                          </p>
                        )}
                        
                        {/* Message content */}
                        <div 
                          className={`rounded-lg px-4 py-2 ${
                            message.senderId === currentUser.id 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white border border-gray-200 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          
                          {/* Attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment) => (
                                <div 
                                  key={attachment.id}
                                  className={`rounded p-2 flex items-center ${
                                    message.senderId === currentUser.id 
                                      ? 'bg-blue-700' 
                                      : 'bg-gray-100'
                                  }`}
                                >
                                  {attachment.type === 'image' ? (
                                    <div>
                                      <img 
                                        src={attachment.thumbnailUrl || attachment.url} 
                                        alt={attachment.name}
                                        className="h-20 w-20 object-cover rounded"
                                      />
                                      <div className={`mt-1 text-xs ${
                                        message.senderId === currentUser.id 
                                          ? 'text-blue-200' 
                                          : 'text-gray-500'
                                      }`}>
                                        {attachment.name}
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className={`p-2 rounded ${
                                        message.senderId === currentUser.id 
                                          ? 'bg-blue-800' 
                                          : 'bg-gray-200'
                                      }`}>
                                        {attachment.type === 'document' ? (
                                          <File className={`h-6 w-6 ${
                                            message.senderId === currentUser.id 
                                              ? 'text-blue-200' 
                                              : 'text-gray-500'
                                          }`} />
                                        ) : (
                                          <Paperclip className={`h-6 w-6 ${
                                            message.senderId === currentUser.id 
                                              ? 'text-blue-200' 
                                              : 'text-gray-500'
                                          }`} />
                                        )}
                                      </div>
                                      <div className="ml-3">
                                        <p className={`text-sm font-medium ${
                                          message.senderId === currentUser.id 
                                            ? 'text-white' 
                                            : 'text-gray-900'
                                        }`}>
                                          {attachment.name}
                                        </p>
                                        <p className={`text-xs ${
                                          message.senderId === currentUser.id 
                                            ? 'text-blue-200' 
                                            : 'text-gray-500'
                                        }`}>
                                          {formatFileSize(attachment.size)}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Message timestamp and status */}
                        <div className={`mt-1 flex items-center text-xs text-gray-500 ${
                          message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                        }`}>
                          <span>{formatMessageDate(message.timestamp)}</span>
                          {message.senderId === currentUser.id && (
                            <span className="ml-1">
                              {getMessageStatusIcon(message.status)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end">
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Écrivez votre message..."
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                      rows={2}
                    />
                    <div className="absolute right-2 bottom-2">
                      <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                        <Smile className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="ml-2 flex space-x-2">
                    <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={newMessage.trim() === ''}
                      className={`p-2 rounded-full ${
                        newMessage.trim() === ''
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune conversation sélectionnée</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Sélectionnez une conversation pour commencer à discuter.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};