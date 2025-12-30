#!/bin/bash
# ===========================================
# Script de verification sante des containers
# ===========================================

set -e

DOMAIN="${1:-localhost:3001}"

echo "=== Verification des containers ==="
echo ""

# Verifier Payload
echo "1. Payload CMS..."
if curl -sf "http://${DOMAIN}/api/health" > /dev/null 2>&1; then
    echo "   [OK] Payload CMS operationnel"
else
    echo "   [ERREUR] Payload CMS non accessible"
    exit 1
fi

# Verifier Redis (si local)
if [ "$DOMAIN" = "localhost:3001" ]; then
    echo ""
    echo "2. Redis..."
    if docker exec payload-redis redis-cli ping 2>/dev/null | grep -q "PONG"; then
        echo "   [OK] Redis operationnel"
    else
        echo "   [ATTENTION] Redis non accessible (peut etre normal)"
    fi
fi

echo ""
echo "=== Utilisation memoire ==="
docker stats --no-stream --format "table {{.Name}}\t{{.MemUsage}}\t{{.MemPerc}}" 2>/dev/null | grep -E "(payload|redis)" || true

echo ""
echo "=== Verification terminee ==="
