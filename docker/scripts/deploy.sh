#!/bin/bash
# ===========================================
# Script de deploiement rapide
# ===========================================

set -e

cd /opt/portfolio

echo "=== Deploiement Portfolio CMS ==="
echo ""

echo "1. Pull de la derniere image..."
docker compose pull

echo ""
echo "2. Redemarrage des containers..."
docker compose up -d --force-recreate payload

echo ""
echo "3. Nettoyage des anciennes images..."
docker image prune -f

echo ""
echo "4. Attente du health check..."
sleep 15

echo ""
echo "5. Verification..."
if curl -sf http://localhost:3001/api/health > /dev/null; then
    echo "   [OK] Deploiement reussi!"
    echo ""
    echo "   URL: https://folio.emacsah.com"
    echo "   Admin: https://folio.emacsah.com/admin"
else
    echo "   [ERREUR] Health check echoue!"
    echo ""
    echo "   Logs:"
    docker compose logs payload --tail 20
    exit 1
fi
