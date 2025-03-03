# Architecture du Module de Gestion Commerciale Prévéris

## Vue d'ensemble

Le module de gestion commerciale de Prévéris est conçu pour gérer l'ensemble du cycle commercial, depuis la demande de devis jusqu'au paiement final. Il s'intègre parfaitement avec les autres modules de la plateforme et offre une expérience utilisateur fluide et intuitive.

## Composants principaux

### 1. Formulaire de demande de devis

Le formulaire de demande de devis est adaptatif et s'ajuste dynamiquement en fonction du type de prestation sélectionné. Il comprend :

- **Sélection du type de prestation** : Audit sécurité, diagnostic accessibilité, suivi annuel, etc.
- **Informations du bâtiment** : Type d'ERP, superficie, nombre d'étages, etc.
- **Besoins spécifiques** : Champs personnalisés selon le type de prestation
- **Informations de contact** : Coordonnées du demandeur
- **Pièces jointes** : Possibilité d'ajouter des plans, photos ou documents existants

### 2. Système de génération de devis

Le système de génération de devis permet aux administrateurs de créer rapidement des devis personnalisés :

- **Modèles prédéfinis** par type de prestation
- **Catalogue de prestations** avec tarifs et descriptions
- **Calcul automatique** des montants, taxes et totaux
- **Personnalisation** des conditions commerciales
- **Prévisualisation** avant envoi
- **Historique des versions** pour suivre les modifications

### 3. Signature électronique

Le module intègre un système de signature électronique conforme aux normes européennes (eIDAS) :

- **Authentification forte** du signataire
- **Horodatage qualifié** des signatures
- **Certificats électroniques** conformes
- **Piste d'audit** complète
- **Archivage à valeur probante** des documents signés

### 4. Gestion des contrats

Une fois le devis accepté, le système génère automatiquement un contrat :

- **Conversion automatique** du devis en contrat
- **Gestion des versions** et des avenants
- **Suivi des échéances** et des renouvellements
- **Alertes automatiques** pour les dates clés
- **Archivage sécurisé** des contrats

### 5. Facturation et paiement

Le module de facturation permet de gérer l'ensemble du processus de facturation :

- **Génération automatique** des factures selon les échéanciers définis
- **Facturation récurrente** pour les contrats de suivi annuel
- **Envoi automatique** des factures par email
- **Suivi des paiements** et des retards
- **Intégration avec les passerelles de paiement** (Stripe, PayPal, etc.)
- **Exports comptables** aux formats standards

## Architecture technique

### Frontend

- **React.js** avec TypeScript pour l'interface utilisateur
- **Tailwind CSS** pour le design responsive
- **PDF.js** pour la prévisualisation des documents
- **Signature Canvas** pour la capture de signature

### Backend

- **API REST** sécurisée pour toutes les opérations
- **Microservices** dédiés pour chaque fonctionnalité majeure
- **Système de file d'attente** pour les opérations asynchrones (génération de PDF, envoi d'emails)
- **Webhooks** pour l'intégration avec les services tiers

### Sécurité

- **Chiffrement de bout en bout** pour les documents sensibles
- **Authentification multi-facteurs** pour les opérations critiques
- **Journalisation** de toutes les actions pour audit
- **Conformité RGPD** intégrée dès la conception

### Intégrations

Le module s'intègre avec plusieurs services tiers :

1. **Services de signature électronique**
   - DocuSign
   - Yousign
   - SignRequest

2. **Passerelles de paiement**
   - Stripe
   - PayPal
   - Systempay

3. **Logiciels comptables**
   - Sage
   - QuickBooks
   - EBP

## Flux de travail commercial

### 1. Demande de devis

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client remplit │     │ Notification au │     │ Préventionniste │
│  le formulaire  ├────►│   responsable   ├────►│   prépare le    │
│   de demande    │     │   commercial    │     │      devis      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client reçoit  │     │  Notification   │     │  Validation et  │
│     le devis    │◄────┤   d'envoi du    │◄────┤   envoi du      │
│                 │     │      devis      │     │     devis       │
│                 │     │                 │     │                 │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│                 │
│  Client accepte │
│  ou refuse le   │
│      devis      │
│                 │
└─────────────────┘
```

### 2. Signature et paiement

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client accepte │     │  Redirection    │     │   Signature     │
│     le devis    ├────►│  vers système   ├────►│  électronique   │
│                 │     │  de signature   │     │                 │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Génération   │     │  Notification   │     │  Document signé │
│    du contrat   │◄────┤  de signature   │◄────┤  et horodaté    │
│                 │     │                 │     │                 │
│                 │     │                 │     │                 │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │
│   Génération    │     │   Paiement      │
│   de facture    ├────►│   en ligne      │
│                 │     │                 │
│                 │     │                 │
└─────────────────┘     └─────────────────┘
```

## Modèles de documents

### Devis

Les modèles de devis sont personnalisables et incluent :

- **En-tête** avec logo et coordonnées de l'entreprise
- **Informations client**
- **Détail des prestations** avec descriptions, quantités et prix
- **Conditions commerciales** personnalisables
- **Mentions légales** obligatoires
- **Instructions de signature**

### Contrat

Les modèles de contrat sont générés à partir des devis acceptés et incluent :

- **Conditions générales** de vente et de service
- **Détail des prestations** et livrables
- **Calendrier d'exécution**
- **Conditions de paiement**
- **Clauses spécifiques** selon le type de prestation

### Facture

Les modèles de facture incluent :

- **Numéro de facture** unique
- **Références** au devis et au contrat
- **Détail des prestations** facturées
- **Échéancier** de paiement
- **Instructions de paiement**
- **Mentions légales** obligatoires

## Spécifications d'API

### API de signature électronique

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API de signature électronique",
    "version": "1.0.0"
  },
  "paths": {
    "/signatures/create": {
      "post": {
        "summary": "Créer une demande de signature",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "documentId": {
                    "type": "string",
                    "description": "ID du document à signer"
                  },
                  "signers": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "email": {
                          "type": "string"
                        },
                        "role": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "expiresAt": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
         }
          }
        },
        "responses": {
          "200": {
            "description": "Demande de signature créée",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "signatureId": {
                      "type": "string"
                    },
                    "signatureUrl": {
                      "type": "string"
                    },
                    "expiresAt": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/signatures/{signatureId}/status": {
      "get": {
        "summary": "Obtenir le statut d'une signature",
        "parameters": [
          {
            "name": "signatureId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Statut de la signature",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": ["pending", "completed", "expired", "declined"]
                    },
                    "completedAt": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "signers": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string"
                          },
                          "status": {
                            "type": "string",
                            "enum": ["pending", "signed", "declined"]
                          },
                          "signedAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### API de paiement

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API de paiement",
    "version": "1.0.0"
  },
  "paths": {
    "/payments/create": {
      "post": {
        "summary": "Créer une demande de paiement",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "invoiceId": {
                    "type": "string",
                    "description": "ID de la facture à payer"
                  },
                  "amount": {
                    "type": "number",
                    "description": "Montant à payer"
                  },
                  "currency": {
                    "type": "string",
                    "default": "EUR"
                  },
                  "customer": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      }
                    }
                  },
                  "returnUrl": {
                    "type": "string",
                    "description": "URL de retour après paiement"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Demande de paiement créée",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "paymentId": {
                      "type": "string"
                    },
                    "paymentUrl": {
                      "type": "string"
                    },
                    "expiresAt": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/payments/{paymentId}/status": {
      "get": {
        "summary": "Obtenir le statut d'un paiement",
        "parameters": [
          {
            "name": "paymentId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Statut du paiement",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": ["pending", "completed", "failed", "refunded"]
                    },
                    "amount": {
                      "type": "number"
                    },
                    "completedAt": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "paymentMethod": {
                      "type": "string"
                    },
                    "transactionId": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Considérations de sécurité et conformité

### Sécurité

- **Chiffrement TLS** pour toutes les communications
- **Chiffrement au repos** pour les données sensibles
- **Authentification forte** pour les opérations critiques
- **Validation des entrées** pour prévenir les injections
- **Protection contre les attaques CSRF**
- **Limitation de débit** pour prévenir les attaques par force brute

### Conformité

- **RGPD** : Minimisation des données, consentement explicite, droit à l'oubli
- **eIDAS** : Conformité avec le règlement européen sur l'identification électronique et les services de confiance
- **Directive NIS** : Mesures de sécurité pour les services numériques
- **PCI DSS** : Conformité pour le traitement des paiements par carte

## Plan de mise en œuvre

### Phase 1 : Fondations (1-2 mois)

- Développement des modèles de données
- Création des interfaces utilisateur de base
- Intégration avec le système d'authentification existant

### Phase 2 : Devis et contrats (2-3 mois)

- Développement du système de génération de devis
- Création des modèles de documents
- Mise en place du workflow d'approbation

### Phase 3 : Signature électronique (1-2 mois)

- Intégration avec les fournisseurs de signature électronique
- Développement du processus de signature
- Tests de conformité eIDAS

### Phase 4 : Facturation et paiement (2-3 mois)

- Développement du système de facturation
- Intégration des passerelles de paiement
- Tests de conformité PCI DSS

### Phase 5 : Finalisation et tests (1-2 mois)

- Tests d'intégration complets
- Optimisation des performances
- Formation des utilisateurs
- Documentation technique et utilisateur