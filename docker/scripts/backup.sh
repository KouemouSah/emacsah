#!/bin/bash
# ===========================================
# Script de sauvegarde
# ===========================================

set -e

BACKUP_DIR="/opt/backups/portfolio"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

mkdir -p $BACKUP_DIR

echo "=== Sauvegarde Portfolio CMS ==="
echo "Date: $DATE"
echo ""

# Backup uploads
echo "1. Sauvegarde des uploads..."
docker run --rm \
    -v payload_uploads:/data:ro \
    -v $BACKUP_DIR:/backup \
    alpine tar czf /backup/uploads_$DATE.tar.gz -C /data .
echo "   [OK] uploads_$DATE.tar.gz"

# Backup media
echo ""
echo "2. Sauvegarde des medias..."
docker run --rm \
    -v payload_media:/data:ro \
    -v $BACKUP_DIR:/backup \
    alpine tar czf /backup/media_$DATE.tar.gz -C /data .
echo "   [OK] media_$DATE.tar.gz"

# Backup database
echo ""
echo "3. Sauvegarde de la base de donnees..."
docker exec db-karlandklaude pg_dump -U folio_sah payload_portfolio | \
    gzip > $BACKUP_DIR/database_$DATE.sql.gz
echo "   [OK] database_$DATE.sql.gz"

# Cleanup old backups
echo ""
echo "4. Nettoyage des anciennes sauvegardes (>$RETENTION_DAYS jours)..."
find $BACKUP_DIR -type f -mtime +$RETENTION_DAYS -delete
echo "   [OK] Nettoyage termine"

echo ""
echo "=== Sauvegarde terminee ==="
echo ""
echo "Fichiers crees:"
ls -lh $BACKUP_DIR/*$DATE* 2>/dev/null || echo "Aucun fichier trouve"
