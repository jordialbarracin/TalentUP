# 🚀 05. Roadmap y Posible Futuro

TalentUP está 100% operativo en su versión 1.0 (Cloud). Sin embargo, la arquitectura plana ha sido diseñada para facilitar una escalabilidad ágil.

A continuación, se detallan las fases planificadas para la evolución del producto (v2.0):

## 1. Integración de NLP (Procesamiento de Lenguaje Natural)
Actualmente, el "Resumen Diario" extrae los titulares más recientes. 
**Iteración propuesta**: Integrar el script de Python con la API de un LLM (Large Language Model) ligero (ej: Google Gemini o LLaMA). El objetivo es procesar el cuerpo completo de los artículos recopilados para generar *insights* analíticos reales, aportando valor añadido más allá de la simple agregación.

## 2. Paginación y Motor de Búsqueda Full-Text
A medida que el orquestador CI/CD acumule datos históricos en `noticias.js`, el peso del archivo aumentará.
**Iteración propuesta**: 
- Implementar paginación lógica en la carga del DOM para mantener el rendimiento (*Performance*) en dispositivos móviles.
- Desarrollar un buscador local en Javascript que permita filtrar el histórico de noticias en tiempo real.

## 3. Sistema de Alertas Proactivas (Push Notifications)
Dado que el backend se ejecuta en un servidor remoto independiente, el *output* puede diversificarse.
**Iteración propuesta**: Configurar un sistema de detección de *keywords* críticas (ej: "Aprobación Reforma Laboral"). Al detectarse, el script ejecutará un *webhook* para enviar notificaciones instantáneas a canales corporativos vía Slack o Telegram API.
