# Stratégie de Sécurité et Protection des Données - Plateforme Prévéris

## Vue d'ensemble

La plateforme Prévéris manipule des données sensibles et des documents confidentiels liés à la sécurité et à l'accessibilité des bâtiments. Cette stratégie de sécurité définit les mesures techniques et organisationnelles mises en place pour garantir la confidentialité, l'intégrité et la disponibilité des données, avec une attention particulière à la protection des documents sensibles comme les plans architecturaux.

## 1. Authentification et Contrôle d'Accès

### Authentification Multi-Facteurs (MFA)

- **Implémentation obligatoire** pour tous les comptes utilisateurs
- **Méthodes supportées** :
  - Application d'authentification (TOTP)
  - SMS/Email avec codes à usage unique
  - Clés de sécurité physiques (FIDO2/WebAuthn)
- **Contextes d'application** :
  - Connexion depuis un nouvel appareil
  - Accès à des documents sensibles
  - Opérations critiques (validation, signature, suppression)

### Gestion Fine des Permissions

- **Modèle RBAC (Role-Based Access Control)** avec les rôles suivants :
  - Administrateur
  - Préventionniste
  - Client
  - Sous-traitant
- **Permissions granulaires** par :
  - Type de document
  - Projet
  - Phase du projet
  - Action (lecture, annotation, validation, téléchargement)
- **Matrice d'accès dynamique** ajustée selon l'avancement du projet
- **Principe du moindre privilège** appliqué systématiquement

### Gestion des Sessions

- **Durée de session limitée** (30 minutes d'inactivité)
- **Invalidation des sessions** lors du changement de mot de passe
- **Détection des sessions concurrentes** avec notification à l'utilisateur
- **Journalisation des connexions** avec détails du contexte (IP, appareil, localisation)

## 2. Protection des Documents

### Système DRM (Digital Rights Management)

- **Chiffrement des documents** avec clés uniques par document
- **Contrôle d'accès contextuel** basé sur :
  - L'identité de l'utilisateur
  - Son rôle dans le projet
  - La phase du projet
  - L'appareil utilisé
  - La localisation
- **Révocation d'accès** en temps réel possible

### Filigranes Dynamiques

- **Filigranes personnalisés** contenant :
  - Identifiant unique de session
  - Nom et email de l'utilisateur
  - Date et heure d'accès
  - Adresse IP
  - Identifiant unique du document
- **Rotation des identifiants** à chaque visualisation
- **Positionnement aléatoire** sur le document pour éviter le masquage
- **Filigranes invisibles** (stéganographie) en complément des filigranes visibles

### Protection contre l'Extraction Non Autorisée

- **Désactivation des fonctions du navigateur** :
  - Copier/coller
  - Impression
  - Téléchargement
  - Capture d'écran (via API Permissions)
- **Rendu sécurisé** des documents :
  - Segmentation des documents en fragments
  - Chargement progressif des segments
  - Rendu via canvas avec protection contre l'extraction
- **Détection des tentatives de capture d'écran** avec :
  - Journalisation de l'événement
  - Notification à l'administrateur
  - Masquage automatique du contenu sensible

### Journalisation des Accès aux Documents

- **Enregistrement détaillé** de chaque accès :
  - Identité de l'utilisateur
  - Horodatage précis
  - Document consulté
  - Actions effectuées (visualisation, annotation, téléchargement)
  - Contexte d'accès (appareil, navigateur, IP)
- **Alertes en temps réel** pour les comportements suspects :
  - Accès multiples en peu de temps
  - Accès depuis des localisations inhabituelles
  - Tentatives d'extraction de données
- **Tableau de bord d'audit** pour les administrateurs

## 3. Chiffrement des Données

### Chiffrement en Transit

- **TLS 1.3** obligatoire pour toutes les communications
- **HSTS (HTTP Strict Transport Security)** activé
- **Certificate Pinning** pour prévenir les attaques Man-in-the-Middle
- **Forward Secrecy** pour protéger les communications passées

### Chiffrement au Repos

- **Chiffrement des bases de données** avec AES-256
- **Chiffrement au niveau des champs** pour les données sensibles
- **Chiffrement des documents** avec clés uniques par document
- **Gestion sécurisée des clés** :
  - Rotation régulière des clés
  - Stockage séparé des clés et des données
  - HSM (Hardware Security Module) pour les opérations cryptographiques critiques

### Chiffrement des Communications en Temps Réel

- **Chiffrement de bout en bout** pour les messages et visioconférences
- **Perfect Forward Secrecy** pour les sessions de communication
- **Vérification de l'intégrité** des messages

## 4. Conformité RGPD

### Gestion des Consentements

- **Recueil explicite** du consentement pour chaque finalité de traitement
- **Journalisation horodatée** des consentements avec :
  - Version des conditions acceptées
  - Méthode de recueil du consentement
  - Preuve du consentement (adresse IP, identifiant de session)
- **Interface de gestion** des consentements pour les utilisateurs

### Droits des Personnes Concernées

- **Procédures automatisées** pour :
  - Droit d'accès
  - Droit de rectification
  - Droit à l'effacement
  - Droit à la portabilité
  - Droit d'opposition
- **Délais de réponse** conformes à la réglementation
- **Journalisation** des demandes et des actions entreprises

### Minimisation des Données

- **Collecte limitée** aux données strictement nécessaires
- **Anonymisation** des données pour les analyses statistiques
- **Purge automatique** des données après la durée de conservation légale

### Registre des Traitements

- **Documentation exhaustive** de tous les traitements
- **Analyses d'impact** pour les traitements à risque
- **Mise à jour régulière** du registre

## 5. Sécurité de l'Infrastructure

### Architecture Sécurisée

- **Segmentation réseau** avec zones de sécurité distinctes
- **Pare-feu applicatif (WAF)** pour la protection contre les attaques web
- **Détection d'intrusion (IDS/IPS)** en temps réel
- **Protection DDoS** multi-couches

### Durcissement des Systèmes

- **Principe du moindre privilège** pour tous les composants
- **Mise à jour automatique** des correctifs de sécurité
- **Désactivation des services inutiles**
- **Configuration sécurisée** de tous les composants

### Surveillance et Détection

- **Monitoring 24/7** de l'infrastructure
- **Analyse comportementale** pour détecter les anomalies
- **Corrélation des événements** de sécurité
- **Alertes en temps réel** pour les incidents critiques

## 6. Plan de Continuité et Reprise d'Activité

### Sauvegarde des Données

- **Stratégie 3-2-1** :
  - 3 copies des données
  - 2 supports différents
  - 1 copie hors site
- **Chiffrement** de toutes les sauvegardes
- **Tests de restauration** réguliers

### Plan de Continuité d'Activité (PCA)

- **Redondance** des composants critiques
- **Répartition géographique** des infrastructures
- **Basculement automatique** en cas de défaillance
- **Procédures documentées** pour tous les scénarios de crise

### Plan de Reprise d'Activité (PRA)

- **Objectifs définis** :
  - RPO (Recovery Point Objective) < 15 minutes
  - RTO (Recovery Time Objective) < 4 heures
- **Environnement de secours** prêt à l'emploi
- **Procédures de restauration** testées régulièrement
- **Exercices de simulation** annuels

## 7. Mesures Techniques Spécifiques pour la Protection des Plans Architecturaux

### Visualisation Sécurisée

- **Rendu fragmenté** des plans :
  - Découpage du plan en segments
  - Chargement progressif des segments
  - Résolution adaptative selon le niveau de zoom
- **Superposition de grilles de protection** rendant l'extraction difficile
- **Métadonnées sensibles** (dimensions, coordonnées) masquées par défaut

### Annotations Sécurisées

- **Stockage séparé** des annotations et du document source
- **Chiffrement spécifique** des annotations
- **Contrôle d'accès granulaire** par couche d'annotation
- **Historique versionné** des modifications avec attribution

### Validation et Approbation

- **Workflow sécurisé** multi-niveaux :
  - Soumission initiale (préventionniste)
  - Revue technique (pairs)
  - Validation client (avec signature électronique)
  - Approbation finale (responsable)
- **Signatures électroniques** conformes eIDAS
- **Horodatage qualifié** de chaque étape
- **Piste d'audit complète** du processus

### Protection contre l'Ingénierie Inverse

- **Suppression des métadonnées techniques** des fichiers
- **Obfuscation des échelles et dimensions** critiques
- **Marquage des zones sensibles** avec restrictions d'accès supplémentaires
- **Versions dégradées** pour les accès à faible privilège

## 8. Plan d'Audit de Sécurité

### Audits Internes

- **Revue trimestrielle** des logs et événements de sécurité
- **Tests d'intrusion** internes bi-annuels
- **Revue des droits d'accès** trimestrielle
- **Vérification de la conformité RGPD** semestrielle

### Audits Externes

- **Tests d'intrusion** annuels par un prestataire indépendant
- **Audit de conformité RGPD** annuel
- **Certification ISO 27001** et renouvellement
- **Audit spécifique** de la protection des documents sensibles

### Amélioration Continue

- **Analyse des incidents** et retours d'expérience
- **Veille sur les vulnérabilités** et nouvelles menaces
- **Mise à jour de la politique de sécurité** annuelle
- **Formation continue** des équipes

## 9. Implémentation Technique

### Authentification Multi-Facteurs

```javascript
// Exemple d'implémentation avec JWT et TOTP
const generateAuthToken = async (user, totpToken) => {
  // Vérifier le code TOTP
  const isValidTOTP = verifyTOTP(user.totpSecret, totpToken);
  
  if (!isValidTOTP) {
    throw new Error('Code d\'authentification invalide');
  }
  
  // Générer le JWT avec durée de vie limitée
  const token = jwt.sign(
    { 
      userId: user.id,
      role: user.role,
      sessionId: uuidv4(),
      contextData: {
        deviceId: getDeviceFingerprint(),
        ipAddress: getClientIP(),
        timestamp: Date.now()
      }
    },
    process.env.JWT_SECRET,
    { expiresIn: '30m' }
  );
  
  // Journaliser la connexion
  await logUserAuthentication(user.id, {
    success: true,
    method: 'totp',
    ipAddress: getClientIP(),
    userAgent: getUserAgent(),
    timestamp: new Date()
  });
  
  return token;
};
```

### Protection des Documents avec DRM

```javascript
// Exemple de middleware pour la protection des documents
const documentProtectionMiddleware = async (req, res, next) => {
  const { documentId } = req.params;
  const { userId, role } = req.user;
  
  // Vérifier les permissions
  const hasAccess = await checkDocumentAccess(documentId, userId, role);
  if (!hasAccess) {
    return res.status(403).json({ error: 'Accès non autorisé' });
  }
  
  // Générer un identifiant unique pour cette session de visualisation
  const viewingSessionId = uuidv4();
  
  // Créer un filigrane dynamique
  const watermarkData = {
    sessionId: viewingSessionId,
    userId,
    userName: req.user.name,
    userEmail: req.user.email,
    timestamp: new Date().toISOString(),
    ipAddress: getClientIP(req)
  };
  
  // Chiffrer le document avec une clé spécifique à cette session
  const sessionKey = crypto.randomBytes(32).toString('hex');
  const encryptedDocument = encryptDocument(document, sessionKey);
  
  // Journaliser l'accès
  await logDocumentAccess({
    documentId,
    userId,
    action: 'view',
    sessionId: viewingSessionId,
    timestamp: new Date(),
    ipAddress: getClientIP(req),
    userAgent: req.headers['user-agent']
  });
  
  // Ajouter les données à la requête pour le gestionnaire suivant
  req.protectedDocument = {
    encryptedContent: encryptedDocument,
    sessionKey,
    watermarkData,
    viewingSessionId
  };
  
  next();
};
```

### Rendu Sécurisé des Documents

```javascript
// Exemple de code frontend pour le rendu sécurisé
const SecureDocumentViewer = ({ documentId, sessionKey }) => {
  const canvasRef = useRef(null);
  const [documentSegments, setDocumentSegments] = useState([]);
  const [watermarkData, setWatermarkData] = useState(null);
  
  useEffect(() => {
    // Désactiver les fonctionnalités du navigateur
    disableBrowserFeatures();
    
    // Charger les segments du document
    loadDocumentSegments(documentId, sessionKey)
      .then(response => {
        setDocumentSegments(response.segments);
        setWatermarkData(response.watermarkData);
      });
      
    // Détecter les tentatives de capture d'écran
    document.addEventListener('keydown', detectPrintScreenAttempt);
    
    return () => {
      document.removeEventListener('keydown', detectPrintScreenAttempt);
    };
  }, [documentId, sessionKey]);
  
  useEffect(() => {
    if (documentSegments.length > 0 && canvasRef.current) {
      renderDocumentToCanvas(canvasRef.current, documentSegments, watermarkData);
    }
  }, [documentSegments, watermarkData]);
  
  const disableBrowserFeatures = () => {
    // Désactiver le clic droit
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // Désactiver la sélection de texte
    document.addEventListener('selectstart', e => e.preventDefault());
    
    // Désactiver le copier/coller
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('cut', e => e.preventDefault());
    document.addEventListener('paste', e => e.preventDefault());
  };
  
  const detectPrintScreenAttempt = (e) => {
    // Détecter la touche Print Screen
    if (e.key === 'PrintScreen') {
      // Masquer temporairement le contenu
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Afficher un message d'avertissement
        ctx.fillStyle = 'red';
        ctx.font = '20px Arial';
        ctx.fillText('Capture d\'écran non autorisée', 50, 100);
        
        // Journaliser la tentative
        logSecurityEvent({
          type: 'screenshot_attempt',
          documentId,
          timestamp: new Date()
        });
        
        // Restaurer le contenu après un délai
        setTimeout(() => {
          renderDocumentToCanvas(canvasRef.current, documentSegments, watermarkData);
        }, 2000);
      }
    }
  };
  
  return (
    <div className="secure-document-container">
      <canvas 
        ref={canvasRef} 
        className="secure-document-canvas"
        width={1200}
        height={800}
      />
      <div className="security-notice">
        Document protégé - Accès surveillé
      </div>
    </div>
  );
};
```

### Filigranes Dynamiques

```javascript
// Fonction pour appliquer un filigrane dynamique sur un canvas
const applyDynamicWatermark = (canvas, watermarkData) => {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  
  // Sauvegarder l'état du canvas
  ctx.save();
  
  // Configurer le style du filigrane
  ctx.globalAlpha = 0.15; // Semi-transparent
  ctx.fillStyle = '#FF0000';
  ctx.font = '16px Arial';
  
  // Créer le texte du filigrane
  const watermarkText = `CONFIDENTIEL - ${watermarkData.userName} - ${watermarkData.sessionId} - ${new Date().toLocaleString()}`;
  
  // Rotation pour filigrane diagonal
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 4);
  
  // Calculer les dimensions du texte
  const textMetrics = ctx.measureText(watermarkText);
  const textWidth = textMetrics.width;
  
  // Dessiner le filigrane en motif répété
  const spacing = textWidth + 100;
  const repetitions = Math.ceil((width + height) / spacing) * 2;
  
  for (let i = -repetitions; i < repetitions; i++) {
    ctx.fillText(watermarkText, i * spacing - width / 2, 0);
    ctx.fillText(watermarkText, i * spacing - width / 2, -200);
    ctx.fillText(watermarkText, i * spacing - width / 2, 200);
    ctx.fillText(watermarkText, i * spacing - width / 2, -400);
    ctx.fillText(watermarkText, i * spacing - width / 2, 400);
  }
  
  // Ajouter un filigrane invisible (stéganographie)
  applyInvisibleWatermark(canvas, watermarkData);
  
  // Restaurer l'état du canvas
  ctx.restore();
};

// Fonction pour appliquer un filigrane invisible
const applyInvisibleWatermark = (canvas, watermarkData) => {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Convertir les données du filigrane en binaire
  const watermarkString = JSON.stringify(watermarkData);
  const binaryWatermark = textToBinary(watermarkString);
  
  // Incorporer les bits du filigrane dans les bits de poids faible des pixels
  // en utilisant une technique de stéganographie LSB (Least Significant Bit)
  for (let i = 0; i < binaryWatermark.length && i < data.length / 4; i++) {
    // Modifier uniquement le bit de poids faible du canal alpha
    const pixelIndex = i * 4 + 3; // Canal alpha
    data[pixelIndex] = (data[pixelIndex] & 0xFE) | parseInt(binaryWatermark[i]);
  }
  
  ctx.putImageData(imageData, 0, 0);
};
```

## 10. Conclusion

Cette stratégie de sécurité complète vise à protéger les données et documents sensibles de la plateforme Prévéris tout en garantissant une expérience utilisateur fluide. L'approche multicouche combine des mesures préventives, détectives et correctives pour faire face aux menaces actuelles et futures.

La protection des documents, en particulier des plans architecturaux, est assurée par une combinaison de techniques avancées : DRM, filigranes dynamiques, rendu sécurisé et journalisation exhaustive. Ces mesures permettent de prévenir l'extraction non autorisée tout en maintenant la collaboration nécessaire entre les différents intervenants d'un projet.

La conformité RGPD est intégrée dès la conception, avec une attention particulière portée à la minimisation des données, au consentement explicite et aux droits des personnes concernées.

Enfin, le plan de continuité et de reprise d'activité garantit la disponibilité du service même en cas d'incident majeur, assurant ainsi la confiance des utilisateurs dans la plateforme.