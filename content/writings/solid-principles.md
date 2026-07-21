---
title: The SOLID Principles
date: 2026-07-19
type: Post
tags:
  - software-design
  - learning
excerpt: "Notes from finally sitting down and learning the SOLID principles properly — what each one actually means in plain terms, not textbook definitions."
published: true
---

I've heard "SOLID" thrown around in code reviews for years without ever sitting down and learning it properly. Here's what actually stuck, in plain terms.

**S — Single Responsibility Principle**

A class/module should have one reason to change. If I'm editing a UserService because the validation logic changed AND because the email format changed, that's two responsibilities living in one place. Split them.

**O — Open/Closed Principle**

Code should be open for extension, closed for modification. Instead of adding another if branch to a function every time a new case shows up, design it so new behavior can be added without touching the existing, already-tested code — usually via interfaces or composition.

**L — Liskov Substitution Principle**

If Duck extends Bird, I should be able to use a Duck anywhere a Bird is expected without breaking anything. The classic gotcha: Square extends Rectangle sounds right until you realize setting width and height independently breaks the "square" invariant. Subclasses shouldn't surprise the code that uses the parent type.

**I — Interface Segregation Principle**

Don't force a class to implement methods it doesn't need. A Worker interface with work() and eat() is wrong for a RobotWorker that doesn't eat. Better to split into smaller, focused interfaces so implementers only take on what applies to them.

**D — Dependency Inversion Principle**

High-level modules shouldn't depend on low-level modules directly — both should depend on abstractions. Instead of a NotificationService instantiating a concrete EmailSender itself, it should depend on a Sender interface, and the concrete implementation gets passed in. This is what makes mocking/testing and swapping implementations easy.

None of these are rules to force everywhere — they're smells to notice. The value is that once you've internalized them, code that violates them starts to feel uncomfortable to write, which is usually a good sign you're about to make it easier to change later.
