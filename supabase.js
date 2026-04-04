const CRM_SYSTEM = `Tu es un coach expert en marketing relationnel et en MLM, intégré dans le CRM "3% Network CRM by Ronald" pour le réseau Zinzino en Martinique.

TON IDENTITÉ :
Tu es un coach terrain aguerri — pas un assistant générique. Tu as des années d'expérience dans le développement de réseaux MLM, la duplication d'équipes et la construction de leaders. Tu parles comme un mentor qui a vécu les situations sur le terrain, pas comme un théoricien.

TES EXPERTISES COMBINÉES :
1. MARKETING RELATIONNEL & MLM — duplication, recrutement, développement d'équipe, pipeline de croissance, activation des partenaires, culture de leader
2. NEUROSCIENCES & COMPORTEMENT HUMAIN — biais cognitifs, déclencheurs de décision, gestion des objections par la psychologie, ancrage émotionnel, principe de réciprocité, preuve sociale
3. PNL & COMMUNICATION PERSUASIVE — calibration, rapport, recadrage des objections, langage d'influence, matching du profil de personnalité, communication non-verbale adaptée au contexte WhatsApp
4. SANTÉ & BIEN-ÊTRE ZINZINO — Omega3, Balance Oil, BalanceTest, bénéfices santé, arguments produit basés sur la science

TON STYLE DE COACHING :
- Direct, concret, actionnable — pas de blabla théorique
- Tu identifies LA priorité, pas 10 options
- Tu donnes des messages WhatsApp naturels, humains, pas commerciaux
- Tu utilises la psychologie comportementale pour timing et formulation
- Tu rappelles les principes de duplication quand c'est pertinent
- Tu parles toujours en français, avec l'énergie d'un coach motivant
- Réponses max 220 mots — percutantes, pas longues

Tu t'adresses à l'utilisateur comme à un leader en construction. Tu crois en son potentiel et tu l'aides à passer à l'action maintenant.`

export async function callClaude(messages, systemOverride) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_KEY
  if (!apiKey) {
    return "⚠️ Clé API Anthropic manquante. Ajoutez VITE_ANTHROPIC_KEY dans vos variables d'environnement Vercel."
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemOverride || CRM_SYSTEM,
        messages,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error?.message || 'Erreur API')
    }

    const data = await response.json()
    return data.content?.[0]?.text || 'Réponse indisponible.'
  } catch (err) {
    console.error('Claude API error:', err)
    return `Erreur de connexion à l'IA : ${err.message}`
  }
}

export async function analyzeContact(contact) {
  const daysSince = (date) => {
    if (!date) return 'inconnu'
    const d = Math.floor((new Date() - new Date(date)) / 86400000)
    return d === 0 ? "aujourd'hui" : `il y a ${d} jours`
  }

  const prompt = `Analyse ce contact et donne-moi une stratégie d'action immédiate :

Nom : ${contact.name}
Statut : ${contact.status}
Température : ${contact.heat === 'hot' ? '🔥 Chaud' : contact.heat === 'warm' ? '🟠 Tiède' : '❄️ Froid'}
Intérêt produit : ${contact.product_interest}/10
Intérêt business : ${contact.business_interest}/10
Dernier contact : ${daysSince(contact.last_contact)}
Objection principale : ${contact.objection || 'Aucune'}
Notes : ${contact.notes || 'Aucune'}
Source : ${contact.source || 'Non renseigné'}

Donne-moi :
1. 🎯 L'action prioritaire à faire MAINTENANT (1 phrase)
2. 💬 Un exemple de message WhatsApp naturel et authentique
3. ⏰ Le meilleur moment pour le contacter`

  return callClaude([{ role: 'user', content: prompt }])
}

export async function askStrategicQuestion(question, contacts) {
  const summary = contacts.slice(0, 10).map(c =>
    `- ${c.name} (${c.status}, ${c.heat === 'hot' ? 'chaud' : c.heat === 'warm' ? 'tiède' : 'froid'}, produit:${c.product_interest}/10, business:${c.business_interest}/10)`
  ).join('\n')

  const prompt = `Voici un aperçu de mon réseau :\n${summary}\n\nMa question : ${question}`
  return callClaude([{ role: 'user', content: prompt }])
}
