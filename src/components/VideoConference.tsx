import React, { useState } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Phone, 
  Share, 
  MessageSquare, 
  Users, 
  Settings,
  X,
  Maximize,
  Minimize,
  User,
  Send,
  MoreVertical
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  isHost: boolean;
}

export const VideoConference: React.FC = () => {
  // State
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 'user1',
      name: 'Jean Martin (Vous)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      isMuted: false,
      isVideoEnabled: true,
      isScreenSharing: false,
      isHost: false
    },
    {
      id: 'user2',
      name: 'Marie Dupont',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      isMuted: false,
      isVideoEnabled: true,
      isScreenSharing: false,
      isHost: true
    },
    {
      id: 'user3',
      name: 'Pierre Durand',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      isMuted: true,
      isVideoEnabled: false,
      isScreenSharing: false,
      isHost: false
    }
  ]);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock chat messages
  const [chatMessages, setChatMessages] = useState<{
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: Date;
  }[]>([
    {
      id: 'msg1',
      senderId: 'user2',
      senderName: 'Marie Dupont',
      content: 'Bonjour à tous, merci de vous être connectés à cette réunion concernant le projet Restaurant Le Gourmet.',
      timestamp: new Date(Date.now() - 15 * 60000)
    },
    {
      id: 'msg2',
      senderId: 'user3',
      senderName: 'Pierre Durand',
      content: 'Bonjour Marie, bonjour Jean. Je vais partager mon écran pour vous montrer les plans modifiés.',
      timestamp: new Date(Date.now() - 10 * 60000)
    },
    {
      id: 'msg3',
      senderId: 'user1',
      senderName: 'Jean Martin',
      content: 'Parfait, j\'ai quelques questions concernant l\'issue de secours.',
      timestamp: new Date(Date.now() - 5 * 60000)
    }
  ]);
  
  // Toggle mute
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Toggle video
  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };
  
  // Toggle screen sharing
  const handleToggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing);
    
    // Update participants
    if (!isScreenSharing) {
      setParticipants(prevParticipants => 
        prevParticipants.map(p => 
          p.id === 'user1' 
            ? { ...p, isScreenSharing: true } 
            : { ...p, isScreenSharing: false }
        )
      );
    } else {
      setParticipants(prevParticipants => 
        prevParticipants.map(p => 
          p.id === 'user1' 
            ? { ...p, isScreenSharing: false } 
            : p
        )
      );
    }
  };
  
  // Toggle chat
  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isParticipantsOpen) {
      setIsParticipantsOpen(false);
    }
  };
  
  // Toggle participants
  const handleToggleParticipants = () => {
    setIsParticipantsOpen(!isParticipantsOpen);
    if (isChatOpen) {
      setIsChatOpen(false);
    }
  };
  
  // Toggle fullscreen
  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  
  // Send chat message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newChatMessage = {
      id: `msg${chatMessages.length + 1}`,
      senderId: 'user1',
      senderName: 'Jean Martin',
      content: newMessage,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage('');
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get screen sharing participant
  const screenSharingParticipant = participants.find(p => p.isScreenSharing);
  
  // Get active participants (excluding screen sharing participant)
  const activeParticipants = screenSharingParticipant 
    ? participants.filter(p => !p.isScreenSharing)
    : participants;
  
  return (
    <div className={`bg-gray-900 overflow-hidden shadow rounded-lg ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="h-[700px] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 bg-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            <Video className="h-5 w-5 text-blue-400 mr-2" />
            <h2 className="text-lg font-medium text-white">Réunion: Restaurant Le Gourmet</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">01:23:45</span>
            {isFullScreen ? (
              <button 
                onClick={handleToggleFullScreen}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <Minimize className="h-5 w-5" />
              </button>
            ) : (
              <button 
                onClick={handleToggleFullScreen}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <Maximize className="h-5 w-5" />
              </button>
            )}
            <button className="p-2 rounded-full text-red-500 hover:text-red-400 hover:bg-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex">
          {/* Video grid */}
          <div className={`flex-1 bg-black p-2 ${isChatOpen || isParticipantsOpen ? 'hidden md:block' : 'block'}`}>
            <div className="h-full flex flex-col">
              {/* Screen sharing */}
              {screenSharingParticipant && (
                <div className="flex-1 mb-2 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <img 
                      src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Screen sharing" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-75 px-3 py-1 rounded-md flex items-center">
                    <Share className="h-4 w-4 text-blue-400 mr-1" />
                    <span className="text-sm text-white">{screenSharingParticipant.name} partage son écran</span>
                  </div>
                </div>
              )}
              
              {/* Video grid */}
              <div className={`grid gap-2 ${screenSharingParticipant ? 'h-32' : 'flex-1'} ${
                activeParticipants.length === 1 ? 'grid-cols-1' :
                activeParticipants.length === 2 ? 'grid-cols-2' :
                activeParticipants.length === 3 ? 'grid-cols-3' :
                activeParticipants.length === 4 ? 'grid-cols-2 grid-rows-2' :
                'grid-cols-3 grid-rows-2'
              }`}>
                {activeParticipants.map(participant => (
                  <div key={participant.id} className="relative bg-gray-800 rounded-md overflow-hidden">
                    {participant.isVideoEnabled ? (
                      <img 
                        src={participant.avatar} 
                        alt={participant.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                          <User className="h-10 w-10 text-gray-500" />
                        </div>
                      </div>
                    )}
                    
                    {/* Participant info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-2 py-1 flex items-center justify-between">
                      <span className="text-sm text-white truncate">
                        {participant.name}
                        {participant.isHost && (
                          <span className="ml-1 text-xs text-blue-300">(Hôte)</span>
                        )}
                      </span>
                      <div className="flex items-center space-x-1">
                        {participant.isMuted && (
                          <MicOff className="h-4 w-4 text-red-400" />
                        )}
                        {!participant.isVideoEnabled && (
                          <VideoOff className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar (chat or participants) */}
          <div className={`w-full md:w-80 bg-gray-800 border-l border-gray-700 ${isChatOpen || isParticipantsOpen ? 'block' : 'hidden md:hidden'}`}>
            {/* Chat */}
            {isChatOpen && (
              <div className="h-full flex flex-col">
                <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Chat</h3>
                  <button 
                    className="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={handleToggleChat}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {chatMessages.map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${message.senderId === 'user1' ? 'order-2' : 'order-1'}`}>
                          {message.senderId !== 'user1' && (
                            <p className="text-xs text-gray-400 mb-1">{message.senderName}</p>
                          )}
                          <div 
                            className={`rounded-lg px-4 py-2 ${
                              message.senderId === 'user1' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-700 text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="mt-1 text-xs text-gray-400 text-right">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-700">
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
                        className="block w-full pl-3 pr-10 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                        rows={2}
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={`ml-2 p-2 rounded-full ${
                        newMessage.trim() 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Participants */}
            {isParticipantsOpen && (
              <div className="h-full flex flex-col">
                <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Participants ({participants.length})</h3>
                  <button 
                    className="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={handleToggleParticipants}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <ul className="space-y-3">
                    {participants.map(participant => (
                      <li key={participant.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative">
                            {participant.avatar ? (
                              <img 
                                src={participant.avatar} 
                                alt={participant.name}
                                className="h-10 w-10 rounded-full"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                                <User className="h-6 w-6 text-gray-500" />
                              </div>
                            )}
                            
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-gray-800"></span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">
                              {participant.name}
                              {participant.isHost && (
                                <span className="ml-1 text-xs text-blue-300">(Hôte)</span>
                              )}
                            </p>
                            <p className="text-xs text-gray-400">
                              {participant.isMuted ? 'Micro désactivé' : 'Micro activé'}
                            </p>
                          </div>
                        </div>
                        <button className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Controls */}
        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleMute}
                className={`p-3 rounded-full ${
                  isMuted 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <button
                onClick={handleToggleVideo}
                className={`p-3 rounded-full ${
                  !isVideoEnabled 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {!isVideoEnabled ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </button>
              <button
                onClick={handleToggleScreenSharing}
                className={`p-3 rounded-full ${
                  isScreenSharing 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <Share className="h-5 w-5" />
              </button>
            </div>
            
            <button className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600">
              <Phone className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleChat}
                className={`p-3 rounded-full ${
                  isChatOpen 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
              </button>
              <button
                onClick={handleToggleParticipants}
                className={`p-3 rounded-full ${
                  isParticipantsOpen 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <Users className="h-5 w-5" />
              </button>
              <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};