# Kiro Configuration for To-Do List Life Dashboard

This directory contains Kiro-specific configuration files for the To-Do List Life Dashboard project.

## Directory Structure

```
.kiro/
├── README.md                    # This file
├── settings/                    # Kiro settings and configuration
│   ├── settings.json           # Project settings and preferences
│   └── hooks.json              # Automated hooks configuration
├── steering/                    # Project guidance and documentation
│   └── todo-dashboard-guide.md # Project overview and guidelines
└── skills/                     # Custom skills and testing
    └── todo-dashboard-tester.md # Automated testing skill
```

## Files Description

### `settings/settings.json`
- **Purpose**: Defines project settings and Kiro behavior
- **Contents**: Project metadata, development preferences, feature flags
- **Usage**: Automatically loaded by Kiro when working on this project

### `settings/hooks.json`
- **Purpose**: Configures automated hooks for development workflow
- **Contents**: Three hooks:
  1. Lint on Save (HTML/CSS validation)
  2. Test Timer Functionality (after JS changes)
  3. Check Local Storage (after task execution)
- **Usage**: Automatically triggers actions based on events

### `steering/todo-dashboard-guide.md`
- **Purpose**: Provides project-specific guidance and documentation
- **Contents**: Technology stack, key features, development guidelines, testing procedures
- **Usage**: Loaded as context when Kiro works on this project

### `skills/todo-dashboard-tester.md`
- **Purpose**: Defines testing procedures and scenarios
- **Contents**: Test scenarios for timer, tasks, themes, data persistence
- **Usage**: Can be activated as a skill for automated testing

## How to Use

### For Development
1. Kiro will automatically use the settings and steering files
2. Hooks will trigger automatically based on configured events
3. The guide provides context for all project-related work

### For Testing
1. Activate the `todo-dashboard-tester` skill for testing scenarios
2. Follow the test procedures outlined in the skill
3. Use the hooks for automated testing during development

### For Project Management
1. Update `settings.json` for project configuration changes
2. Modify `hooks.json` to add/remove automated workflows
3. Edit `todo-dashboard-guide.md` for project documentation updates

## Git Integration
- The `.kiro` directory is partially ignored in `.gitignore`
- Only `steering/todo-dashboard-guide.md` is committed to version control
- Settings and skills files are kept locally (not shared)

## Best Practices

### When to Update Files
1. **settings.json**: When project configuration changes
2. **hooks.json**: When adding new automated workflows
3. **steering files**: When project requirements or guidelines change
4. **skills**: When adding new testing or automation capabilities

### File Maintenance
- Keep files up to date with project changes
- Document any custom configurations
- Test hooks and skills regularly
- Backup settings before major changes

## Support
For issues with Kiro configuration:
1. Check Kiro documentation
2. Verify file formats are correct
3. Test individual components
4. Clear Kiro cache if needed

## Notes
- This configuration is specific to the To-Do List Life Dashboard project
- Files can be customized based on project needs
- Some features require Kiro Pro or specific permissions