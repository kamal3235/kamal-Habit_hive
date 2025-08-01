import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MosaicReveal from './MosaicReveal';

// Mock the image import
vi.mock('../assets/beehive.png', () => ({
  default: 'mocked-beehive-image.png'
}));

describe('MosaicReveal', () => {
  const mockImageSrc = 'test-image.jpg';
  const mockOnComplete = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    mockOnComplete.mockClear();
  });

  it('renders with default props', () => {
    const { container } = render(<MosaicReveal imageSrc={mockImageSrc} />);
    const squares = container.querySelectorAll('.bg-gray-800');
    expect(squares).toHaveLength(16); // Default 4x4 grid
  });
it('handles missing imageSrc prop', () => {
    const { container } = render(<MosaicReveal />);
    const squares = container.querySelectorAll('.bg-gray-800');
    expect(squares).toHaveLength(16); // Default grid should still render
});

it('handles negative filledSquares value', () => {
    const { container } = render(
        <MosaicReveal 
            imageSrc={mockImageSrc}
            filledSquares={-1}
            gridSize={4}
        />
    );
    const revealedSquares = container.querySelectorAll('[style*="opacity: 1"]');
    expect(revealedSquares).toHaveLength(0); // No squares should be revealed
});

it('handles filledSquares greater than total squares', () => {
    const { container } = render(
        <MosaicReveal
            imageSrc={mockImageSrc} 
            filledSquares={20}
            gridSize={4}
        />
    );
    const revealedSquares = container.querySelectorAll('[style*="opacity: 1"]');
    expect(revealedSquares).toHaveLength(16); // Should cap at total squares
});

it('maintains aspect ratio with different grid sizes', () => {
    const { container } = render(
        <MosaicReveal imageSrc={mockImageSrc} gridSize={3} />
    );
    const grid = container.querySelector('.grid');
    expect(grid).toHaveStyle({
        aspectRatio: '1/1'
    });
});

  it('applies correct styles for revealed squares', () => {
    const { container } = render(
      <MosaicReveal
        imageSrc={mockImageSrc}
        filledSquares={1}
        gridSize={4}
      />
    );
    
    const firstSquare = container.querySelector('.bg-gray-800');
    const computedStyle = window.getComputedStyle(firstSquare);
    
    expect(firstSquare).toHaveStyle({
      backgroundImage: `url(${mockImageSrc})`,
      opacity: '1',
      filter: 'blur(3px)'
    });
  });

  it('applies correct styles for unrevealed squares', () => {
    const { container } = render(
      <MosaicReveal
        imageSrc={mockImageSrc}
        filledSquares={0}
        gridSize={4}
      />
    );
    
    const firstSquare = container.querySelector('.bg-gray-800');
    expect(firstSquare).toHaveStyle({
      opacity: '0.3'
    });
  });

  it('calculates correct background position for revealed squares', () => {
    const gridSize = 4;
    const { container } = render(
      <MosaicReveal
        imageSrc={mockImageSrc}
        filledSquares={16}
        gridSize={gridSize}
      />
    );
    
    const squares = container.querySelectorAll('.bg-gray-800');
    squares.forEach((square, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const sizePercent = 100 / gridSize;
      
      expect(square).toHaveStyle({
        backgroundPosition: `${col * sizePercent}% ${row * sizePercent}%`,
        backgroundSize: `${gridSize * 100}%`
      });
    });
  });

  it('updates revealed squares when filledSquares prop changes', () => {
    const { rerender, container } = render(
      <MosaicReveal
        imageSrc={mockImageSrc}
        filledSquares={0}
        gridSize={4}
      />
    );

    // Initially all squares should be unrevealed
    let revealedSquares = container.querySelectorAll('[style*="opacity: 1"]');
    expect(revealedSquares).toHaveLength(0);

    // Update filledSquares
    rerender(
      <MosaicReveal
        imageSrc={mockImageSrc}
        filledSquares={4}
        gridSize={4}
      />
    );

    revealedSquares = container.querySelectorAll('[style*="opacity: 1"]');
    expect(revealedSquares).toHaveLength(4);
  });

  it('renders background image with correct blur effect', () => {
    const { container } = render(
      <MosaicReveal imageSrc={mockImageSrc} />
    );
    
    const backgroundDiv = container.querySelector('.absolute.inset-0');
    expect(backgroundDiv.style.backgroundImage).to.equal('url("mocked-beehive-image.png")');
    expect(backgroundDiv.style.filter).to.equal('blur(4px) brightness(0.3)');
  });
})