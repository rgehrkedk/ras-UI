import React, { useState } from 'react'
import { Badge, Button, Icon } from '@ras-ui/react'

export interface ClubCardProps {
  name: string
  city: string
  tags?: string[]
  price?: string
  image?: string
  rating?: number
  reviews?: number
  distance?: string
  isBookmarked?: boolean
}

export const ClubCard: React.FC<ClubCardProps> = ({ 
  name, 
  city, 
  tags = [], 
  price, 
  image, 
  rating = 4.5,
  reviews = 128,
  distance = '2.3 km',
  isBookmarked = false
}) => {
  const variantsCycle = ['secondary', 'success', 'warning', 'info', 'outline'] as const
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div style={{
      background: 'var(--color-semantic-surface-raised)',
      borderRadius: '1.5rem',
      border: '1px solid var(--color-semantic-border-default)',
      boxShadow: isHovered ? '0 12px 32px var(--color-semantic-shadow-md)' : '0 4px 16px var(--color-semantic-shadow-sm)',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      overflow: 'hidden',
      cursor: 'pointer'
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      {image && (
        <div style={{ 
          position: 'relative',
          overflow: 'hidden',
          height: '12rem'
        }}>
          <img 
            src={image} 
            alt={name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }} 
          />
          
          {/* Rating Overlay */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '2rem',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backdropFilter: 'blur(8px)'
          }}>
            <span style={{ color: '#fbbf24' }}>★</span>
            <span style={{ fontWeight: 600 }}>{rating}</span>
            <span style={{ opacity: 0.8 }}>({reviews})</span>
          </div>
          
          {/* Bookmark Button */}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <Button
              variant="ghost"
              size="sm"
              onPress={() => setBookmarked(!bookmarked)}
              style={{ 
                padding: '0.5rem',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: '50%'
              }}
            >
              <Icon 
                name="star" 
                size="sm" 
                style={{ 
                  color: bookmarked ? '#fbbf24' : 'var(--color-semantic-text-secondary)',
                  fill: bookmarked ? 'currentColor' : 'none'
                }} 
              />
            </Button>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div style={{ padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '1.25rem', 
            fontWeight: 700,
            color: 'var(--color-semantic-text-primary)'
          }}>
            {name}
          </h3>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--color-semantic-text-secondary)',
            fontSize: '0.875rem'
          }}>
            <span>{city}</span>
            <span>•</span>
            <span>{distance}</span>
          </div>
        </div>
        
        {/* Tags */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          flexWrap: 'wrap', 
          marginBottom: '1.5rem' 
        }}>
          {tags.map((t, i) => (
            <Badge key={t} variant={variantsCycle[i % variantsCycle.length]} size="sm">
              {t}
            </Badge>
          ))}
        </div>

        {/* Price & Actions */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginTop: 'auto'
        }}>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700,
            color: 'var(--color-brand-primary)'
          }}>
            {price}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="primary">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
